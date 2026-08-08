import "dotenv/config";
import express from "express";
import cors from "cors";
import { getBookedStartTimes, createBooking } from "./bookingsStore.js";
import { CONSULTANTS } from "./consultants.js";
import { getConsultantBookings } from "./consultantBookingsStore.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const CALENDLY_TOKEN = process.env.CALENDLY_TOKEN;
const CALENDLY_EVENT_TYPE = process.env.CALENDLY_EVENT_TYPE;

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

app.get("/api/consultants/:id/bookings", (req, res) => {
    const consultant = CONSULTANTS[req.params.id];
    if (!consultant) return res.status(404).json({ message: "Unknown consultant" });

    res.json({ consultant: consultant.name, bookings: getConsultantBookings(req.params.id) });
});

app.listen(PORT, () => {
    console.log(`Calendly API server listening on http://localhost:${PORT}`);
});
