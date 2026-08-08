import React, { useEffect, useState } from "react";
import { MapPin, BedDouble, Bath, Maximize } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchListings } from "../lib/listings";

const TABS = [
  { label: "All", value: "all" },
  { label: "For Sale", value: "sale" },
  { label: "For Rent", value: "rent" },
];

// Mirrors the CRM's listing badges so the public site reads the same as the back office.
const STATUS_STYLES = {
  available: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  sold: "bg-gray-200 text-gray-600",
};

export default function FilterTabs({ limit }) {
  const [active, setActive] = useState("all");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const locationFilter = searchParams.get("location");

  useEffect(() => {
    let cancelled = false;

    fetchListings()
      .then((data) => {
        if (!cancelled) setListings(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = listings.filter((listing) => {
    // MLS cities arrive upper-cased ("ORLANDO") while the location tiles are title-cased.
    if (
      locationFilter &&
      listing.city?.toLowerCase() !== locationFilter.toLowerCase()
    ) {
      return false;
    }
    if (active === "all") return true;
    return listing.listing_type === active;
  });

  const visible = limit ? filtered.slice(0, limit) : filtered;

  return (
    <div className="px-6 md:px-16 py-10 bg-gray-100">

      {/* LOCATION FILTER BANNER */}
      {locationFilter && (
        <div className="flex items-center justify-between mb-6 bg-white rounded-xl px-5 py-3 shadow-sm">
          <span className="text-sm text-gray-700">
            Showing properties in{" "}
            <span className="font-semibold">{locationFilter}</span>
          </span>
          <button
            onClick={() => setSearchParams({})}
            className="text-sm font-medium text-[#284769] hover:underline"
          >
            Clear filter
          </button>
        </div>
      )}

      {/* FILTER BUTTONS */}
      <div className="flex gap-3 mb-8">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActive(tab.value)}
            className={`px-5 py-2 rounded-xl text-sm transition
              ${active === tab.value
                ? "bg-linear-to-r from-[#345578] to-[#284769] text-white"
                : "bg-white text-gray-600 hover:bg-gray-200"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading && <p className="text-gray-500">Loading listings...</p>}

      {error && (
        <p className="text-red-600">Could not load listings. {error}</p>
      )}

      {!loading && !error && visible.length === 0 && (
        <p className="text-gray-500">No properties match this filter right now.</p>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {visible.map((listing) => (
          <Link
            key={listing.id}
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
        ))}

      </div>

    </div>
  );
}
