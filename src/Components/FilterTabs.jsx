import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchListings } from "../lib/listings";
import ListingCard from "./ListingCard";

const TABS = [
  { label: "All", value: "all" },
  { label: "For Sale", value: "sale" },
  { label: "For Rent", value: "rent" },
];

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
          <ListingCard key={listing.id} listing={listing} />
        ))}

      </div>

    </div>
  );
}
