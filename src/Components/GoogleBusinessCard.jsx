import React from "react";
import {
  FaStar,
  FaDirections,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaRegClock,
  FaPen,
} from "react-icons/fa";
import { GOOGLE_BUSINESS, GOOGLE_URLS } from "../lib/google";

// Office opening times, mirroring what the Google profile lists. Left empty on purpose:
// an hours row is worse than no hours row if it sends someone to a locked door.
// Shape: { day: 0-6 starting Sunday, open: "09:00", close: "17:00" }
const OFFICE_HOURS = [];

// The office keeps Eastern time, so the status has to be worked out in the office's
// timezone rather than the visitor's -- someone browsing from California at 3pm local
// is looking at a closed office.
const OFFICE_TIMEZONE = "America/New_York";

// TODO: return the "Open / Closes 5 PM" line, or null when the schedule is unknown.
// Worth deciding: does a closed office show the next opening time, or just "Closed"?
// The first is more useful to a buyer deciding whether to wait or leave a voicemail.
function getOpenStatus() {
  if (OFFICE_HOURS.length === 0) return null;

  return null;
}

export default function GoogleBusinessCard() {
  const status = getOpenStatus();

  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden">

      {/* Map */}
      <iframe
        src={GOOGLE_URLS.mapEmbed}
        title={`Map showing ${GOOGLE_BUSINESS.name}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-56 border-0"
      />

      <div className="p-8">

        {/* Name */}
        <h3 className="text-2xl font-bold">{GOOGLE_BUSINESS.name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          <span className="font-semibold">{GOOGLE_BUSINESS.rating.toFixed(1)}</span>

          <div className="flex gap-0.5 text-yellow-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={star <= Math.round(GOOGLE_BUSINESS.rating) ? "" : "text-gray-300"}
              />
            ))}
          </div>

          <a
            href={GOOGLE_URLS.profile}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#345578] hover:underline"
          >
            {GOOGLE_BUSINESS.reviewCount} Google reviews
          </a>
        </div>

        {/* Category */}
        <p className="text-gray-500 text-sm mt-1">{GOOGLE_BUSINESS.category}</p>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mt-6">

          <a
            href={GOOGLE_URLS.directions}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-5 py-2 text-sm hover:border-[#345578] hover:text-[#345578] transition"
          >
            <FaDirections className="text-[#345578]" />
            Directions
          </a>

          <a
            href={GOOGLE_BUSINESS.phoneHref}
            className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-5 py-2 text-sm hover:border-[#345578] hover:text-[#345578] transition"
          >
            <FaPhoneAlt className="text-[#345578]" />
            Call
          </a>

          <a
            href={GOOGLE_URLS.writeReview}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-5 py-2 text-sm hover:border-[#345578] hover:text-[#345578] transition"
          >
            <FaPen className="text-[#345578]" />
            Review
          </a>

        </div>

        {/* Details */}
        <div className="border-t border-gray-200 mt-7 pt-6 space-y-3 text-sm">

          <div className="flex gap-3">
            <FaMapMarkerAlt className="text-[#345578] mt-1 shrink-0" />
            <a
              href={GOOGLE_URLS.profile}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#345578] transition"
            >
              {GOOGLE_BUSINESS.address}
            </a>
          </div>

          <div className="flex gap-3">
            <FaPhoneAlt className="text-[#345578] mt-1 shrink-0" />
            <a
              href={GOOGLE_BUSINESS.phoneHref}
              className="text-gray-600 hover:text-[#345578] transition"
            >
              {GOOGLE_BUSINESS.phone}
            </a>
          </div>

          {status && (
            <div className="flex gap-3">
              <FaRegClock className="text-[#345578] mt-1 shrink-0" />
              <span className="text-gray-600">{status}</span>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
