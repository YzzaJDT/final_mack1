import "dotenv/config";
import express from "express";
import cors from "cors";
import crypto from "node:crypto";
import { getBookedStartTimes, createBooking } from "./bookingsStore.js";
import { CONSULTANTS } from "./consultants.js";
import { recordConsultantBooking, getConsultantBookings } from "./consultantBookingsStore.js";
import { sendConsultationNotice } from "./mailer.js";

const app = express();
app.use(cors());
// Keep the raw body around so the Calendly webhook signature (computed over
// the exact bytes Calendly sent) can be verified before trusting the payload.
app.use(
    express.json({
        verify: (req, res, buf) => {
            req.rawBody = buf;
        },
    })
);

const PORT = process.env.PORT || 3001;
const CALENDLY_TOKEN = process.env.CALENDLY_TOKEN;
const CALENDLY_EVENT_TYPE = process.env.CALENDLY_EVENT_TYPE;
const CALENDLY_WEBHOOK_SIGNING_KEY = process.env.CALENDLY_WEBHOOK_SIGNING_KEY;

app.get("/api/calendly/event-types", async (req, res) => {
    // Calendly's event_type_available_times endpoint only accepts a window
    // of up to 7 days, so we page through several weeks in 7-day chunks
    // and merge the results into one collection.
    const windowDays = 7;
    const weeksAhead = 5;

    let cursor = new Date(Date.now() + 60 * 60 * 1000); // now (UTC) + 1 hour
    const rangeEnd = new Date(Date.now() + weeksAhead * 7 * 24 * 60 * 60 * 1000);

    let collection = [];

    while (cursor < rangeEnd) {
        const windowEnd = new Date(
            Math.min(cursor.getTime() + windowDays * 24 * 60 * 60 * 1000, rangeEnd.getTime())
        );

        const url = new URL("https://api.calendly.com/event_type_available_times");
        url.searchParams.set("event_type", CALENDLY_EVENT_TYPE);
        url.searchParams.set("start_time", cursor.toISOString());
        url.searchParams.set("end_time", windowEnd.toISOString());

        const response = await fetch(url, {
            headers: { Authorization: `Bearer ${CALENDLY_TOKEN}` },
        });

        if (response.ok) {
            const body = await response.json();
            collection = collection.concat(body.collection ?? []);
        }

        cursor = windowEnd;
    }

    const bookedTimes = getBookedStartTimes();

    const slots = collection.map((slot) => ({
        ...slot,
        occupied: bookedTimes.includes(new Date(slot.start_time).toISOString()),
    }));

    res.json({
        status: 200,
        data: { collection: slots },
    });
});

app.post("/api/calendly/book-slot", (req, res) => {
    const { start_time: startTime } = req.body;

    if (!startTime || isNaN(Date.parse(startTime))) {
        return res.status(422).json({ message: "The start_time field is required and must be a valid date." });
    }

    const { conflict, booking } = createBooking({ startTime, userId: req.body.user_id ?? null });

    if (conflict) {
        return res.status(409).json({ message: "Slot already taken" });
    }

    res.json({ message: "Booked successfully", booking });
});

function isValidCalendlySignature(req) {
    if (!CALENDLY_WEBHOOK_SIGNING_KEY) return false;

    const header = req.get("Calendly-Webhook-Signature");
    if (!header) return false;

    const parts = Object.fromEntries(
        header.split(",").map((part) => part.split("="))
    );
    const { t: timestamp, v1: signature } = parts;
    if (!timestamp || !signature) return false;

    const expected = crypto
        .createHmac("sha256", CALENDLY_WEBHOOK_SIGNING_KEY)
        .update(`${timestamp}.${req.rawBody}`)
        .digest("hex");

    const expectedBuf = Buffer.from(expected, "hex");
    const signatureBuf = Buffer.from(signature, "hex");

    return (
        expectedBuf.length === signatureBuf.length &&
        crypto.timingSafeEqual(expectedBuf, signatureBuf)
    );
}

// Calendly calls this after every booking. The consultant page tags each
// booking with utm_content = "jazzy" | "jazel" (see ConsultationPage.jsx),
// so this handler reads that tag to record the booking against the right
// consultant and email them the details.
app.post("/api/calendly/webhook", async (req, res) => {
    if (!isValidCalendlySignature(req)) {
        return res.status(401).json({ message: "Invalid webhook signature" });
    }

    // Acknowledge immediately; Calendly retries on non-2xx or slow responses.
    res.status(200).json({ received: true });

    if (req.body.event !== "invitee.created") return;

    const payload = req.body.payload ?? {};
    const consultantId = payload.tracking?.utm_content;
    const consultant = CONSULTANTS[consultantId];

    if (!consultant) {
        console.warn(`[webhook] Unknown or missing consultant tag: "${consultantId}"`);
        return;
    }

    const { duplicate, booking } = recordConsultantBooking({
        consultantId,
        inviteeUri: payload.uri,
        inviteeName: payload.name,
        inviteeEmail: payload.email,
        startTime: payload.scheduled_event?.start_time,
        endTime: payload.scheduled_event?.end_time,
        eventUri: payload.scheduled_event?.uri,
    });

    if (duplicate) return;

    try {
        await sendConsultationNotice({
            consultant,
            inviteeName: booking.inviteeName,
            inviteeEmail: booking.inviteeEmail,
            startTime: booking.startTime,
        });
    } catch (err) {
        console.error("[webhook] Failed to send consultant notification:", err);
    }
});

app.get("/api/consultants/:id/bookings", (req, res) => {
    const consultant = CONSULTANTS[req.params.id];
    if (!consultant) return res.status(404).json({ message: "Unknown consultant" });

    res.json({ consultant: consultant.name, bookings: getConsultantBookings(req.params.id) });
});

app.listen(PORT, () => {
    console.log(`Calendly API server listening on http://localhost:${PORT}`);
});
