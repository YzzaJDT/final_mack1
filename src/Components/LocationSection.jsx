import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CITIES, getPropertyCity } from "../data/cities";

export default function LocationSection() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch("https://6a24ec645447714a6f830bdb.mockapi.io/listing/realstate")
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((err) => console.log(err));
  }, []);

  const countForCity = (cityName) =>
    properties.filter((property) => getPropertyCity(property) === cityName).length;

  return (
    <div className="bg-gray-100 px-6 md:px-16 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {CITIES.map((loc, index) => (
          <Link
            key={index}
            to={`/Properties?location=${encodeURIComponent(loc.name)}`}
            className="relative h-72 rounded-2xl overflow-hidden group cursor-pointer transition duration-300 hover:-translate-y-2 hover:shadow-xl block"
          >
            <img src={loc.image} alt={loc.name} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition duration-300"></div>
            <div className="absolute bottom-4 left-4 text-white transition duration-300 group-hover:-translate-y-1">
              <div className="text-lg font-semibold">{loc.name}</div>
              <div className="text-sm text-white/80">
                {countForCity(loc.name)} propert{countForCity(loc.name) === 1 ? "y" : "ies"}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
