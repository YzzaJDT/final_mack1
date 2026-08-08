import React from "react";
import { MapPin, BedDouble, Bath, Maximize } from "lucide-react";
import { Link } from "react-router-dom";

// Mirrors the CRM's listing badges so the public site reads the same as the back office.
const STATUS_STYLES = {
  available: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  sold: "bg-gray-200 text-gray-600",
};

// Single listing tile, shared by the properties grid and the "similar listings" rail so
// both surfaces render identically and only change together.
export default function ListingCard({ listing }) {
  return (
    <Link
      to={`/property-show?id=${listing.id}`}
      className="bg-white rounded-2xl overflow-hidden shadow-sm transition hover:scale-105 duration-300 block"
    >
      {/* IMAGE */}
      <div className="h-56 w-full overflow-hidden relative">
        <img
          src={listing.image_url || "/images/house.jpg"}
          className={`w-full h-full object-cover hover:scale-105 transition ${
            listing.status === "sold" ? "opacity-75" : ""
          }`}
          alt={listing.displayAddress}
          loading="lazy"
        />

        <span
          className={`absolute bottom-3 left-3 text-xs px-3 py-1 rounded-lg capitalize ${
            STATUS_STYLES[listing.status] ?? "bg-gray-100 text-gray-600"
          }`}
        >
          {listing.statusText}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-6">
        {/* PRICE + TYPE */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold">{listing.priceLabel}</h3>
          <span className="text-xs px-3 py-1 rounded-lg bg-blue-50 text-[#284769]">
            {listing.isRental ? "For Rent" : "For Sale"}
          </span>
        </div>

        {/* ADDRESS */}
        <div className="flex items-center text-gray-500 text-sm gap-2 mb-4">
          <MapPin size={16} className="shrink-0" />
          <span className="truncate">{listing.fullAddress}</span>
        </div>

        {/* INFO -- zero reads as "not applicable" here: vacant land reports 0 beds
            and 0 baths, and "0 bd" on a lot listing is noise, not information. */}
        <div className="border-t pt-4 flex justify-between text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            <Maximize size={16} />
            {listing.sqft ? `${listing.sqft.toLocaleString()} sqft` : "--"}
          </div>
          <div className="flex items-center gap-2">
            <BedDouble size={16} />
            {listing.beds || "--"}
          </div>
          <div className="flex items-center gap-2">
            <Bath size={16} />
            {listing.baths || "--"}
          </div>
        </div>

        {/* IDX rules require the listing brokerage shown alongside MLS listings. */}
        {listing.source === "mls" && listing.listing_office && (
          <p className="mt-3 text-[11px] text-gray-400 truncate">
            Courtesy of {listing.listing_office}
          </p>
        )}
      </div>
    </Link>
  );
}
