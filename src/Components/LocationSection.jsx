import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CITIES } from "../data/cities";
import { fetchListings } from "../lib/listings";

// MLS supplies cities upper-cased ("ORLANDO"); the tiles read better title-cased.
const titleCase = (value) =>
  value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

export default function LocationSection() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    let cancelled = false;

    fetchListings()
      .then((data) => {
        if (!cancelled) setListings(data);
      })
      .catch(() => {
        if (!cancelled) setListings([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Built from the listings themselves rather than a fixed list, so a tile can never
  // advertise a city with nothing in it. Landmark photos are used where one exists for
  // that city, otherwise the city is represented by one of its own listings.
  const cities = useMemo(() => {
    const byName = new Map();

    for (const listing of listings) {
      if (!listing.city) continue;
      const key = listing.city.toLowerCase();
      const existing = byName.get(key);

      if (existing) {
        existing.count += 1;
        continue;
      }

      byName.set(key, {
        name: titleCase(listing.city),
        count: 1,
        image:
          CITIES.find((city) => city.name.toLowerCase() === key)?.image ||
          listing.image_url,
      });
    }

    return [...byName.values()].sort((a, b) => b.count - a.count);
  }, [listings]);

  if (cities.length === 0) return null;

  return (
    <div className="bg-gray-100 px-6 md:px-16 py-12">
      {/* Heading lives here rather than on the page so it disappears with the grid. */}
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">
        Where We Have Homes{" "}
        <span className="bg-linear-to-r from-[#345578] to-[#284769] bg-clip-text text-transparent">
          Available Now
        </span>
      </h2>

      <p className="text-gray-500 max-w-xl mx-auto mb-12 text-sm sm:text-base text-center">
        See what's for sale today across Central Florida.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cities.map((loc) => (
          <Link
            key={loc.name}
            to={`/Properties?location=${encodeURIComponent(loc.name)}`}
            className="relative h-72 rounded-2xl overflow-hidden group cursor-pointer transition duration-300 hover:-translate-y-2 hover:shadow-xl block"
          >
            <img
              src={loc.image || "/images/house.jpg"}
              alt={loc.name}
              className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition duration-300"></div>
            <div className="absolute bottom-4 left-4 text-white transition duration-300 group-hover:-translate-y-1">
              <div className="text-lg font-semibold">{loc.name}</div>
              <div className="text-sm text-white/80">
                {loc.count} propert{loc.count === 1 ? "y" : "ies"}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
