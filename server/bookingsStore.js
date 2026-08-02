import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_FILE = path.join(__dirname, "data", "bookings.json");

function readAll() {
    if (!existsSync(DB_FILE)) return [];
    return JSON.parse(readFileSync(DB_FILE, "utf-8"));
}

function writeAll(bookings) {
    writeFileSync(DB_FILE, JSON.stringify(bookings, null, 2));
}

export function getBookedStartTimes() {
    return readAll().map((booking) => new Date(booking.start_time).toISOString());
}

export function createBooking({ startTime, userId = null }) {
    const bookings = readAll();
    const targetIso = new Date(startTime).toISOString();

    const exists = bookings.some(
        (booking) => new Date(booking.start_time).toISOString() === targetIso
    );

    if (exists) {
        return { conflict: true };
    }

    const booking = {
        id: bookings.length ? Math.max(...bookings.map((b) => b.id)) + 1 : 1,
        start_time: targetIso,
        user_id: userId,
        created_at: new Date().toISOString(),
    };

    bookings.push(booking);
    writeAll(bookings);

    return { conflict: false, booking };
}
