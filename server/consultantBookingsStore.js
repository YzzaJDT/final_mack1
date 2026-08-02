import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_FILE = path.join(__dirname, "data", "consultant-bookings.json");

function readAll() {
    if (!existsSync(DB_FILE)) return [];
    return JSON.parse(readFileSync(DB_FILE, "utf-8"));
}

function writeAll(bookings) {
    mkdirSync(path.dirname(DB_FILE), { recursive: true });
    writeFileSync(DB_FILE, JSON.stringify(bookings, null, 2));
}

// Calendly can redeliver the same invitee.created event, so recording is
// idempotent on the invitee's URI (unique per booking).
export function recordConsultantBooking({
    consultantId,
    inviteeUri,
    inviteeName,
    inviteeEmail,
    startTime,
    endTime,
    eventUri,
}) {
    const bookings = readAll();

    if (bookings.some((b) => b.inviteeUri === inviteeUri)) {
        return { duplicate: true, booking: null };
    }

    const booking = {
        id: bookings.length ? Math.max(...bookings.map((b) => b.id)) + 1 : 1,
        consultantId,
        inviteeUri,
        inviteeName,
        inviteeEmail,
        startTime,
        endTime,
        eventUri,
        recordedAt: new Date().toISOString(),
    };

    bookings.push(booking);
    writeAll(bookings);

    return { duplicate: false, booking };
}

export function getConsultantBookings(consultantId) {
    const bookings = readAll();
    return consultantId
        ? bookings.filter((b) => b.consultantId === consultantId)
        : bookings;
}
