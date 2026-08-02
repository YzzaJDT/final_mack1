import React, { useEffect, useState } from "react";
import { MapPin, BedDouble, Bath, Maximize } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { getPropertyCity } from "../data/cities";

export default function FilterTabs() {
  const [active, setActive] = useState("All");
  const [properties, setProperties] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const locationFilter = searchParams.get("location");

  const tabs = ["All", "For Sale", "For Rent"];

  // ✅ FETCH API DATA
  useEffect(() => {
    fetch("https://6a24ec645447714a6f830bdb.mockapi.io/listing/realstate")
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((err) => console.log(err));
  }, []);

  // ✅ FILTER LOGIC
  const filtered = properties.filter((item) => {
    if (locationFilter && getPropertyCity(item) !== locationFilter) return false;
    if (active === "All") return true;
    return item.type === active;
  });

  // ✅ TAG COLOR FUNCTION (UPDATED)
  const getTagStyle = (type) => {
    if (type === "For Sale" || type === "Sale") return "bg-green-100 text-green-600";
    if (type === "For Rent" || type === "Rent") return "bg-purple-100 text-purple-600";
    return "bg-gray-100 text-gray-600";
  };

  const propertyLink = (property) => {
    const params = new URLSearchParams({
      image: property.image ?? "",
      image1: property.image1 ?? "",
      image2: property.image2 ?? "",
      image3: property.image3 ?? "",
      image4: property.image4 ?? "",
      price: property.price ?? "",
      per: property.per ?? "",
      address: property.address ?? "",
      sqft: property.sqft ?? "",
      beds: property.beds ?? "",
      baths: property.baths ?? "",
      tag: property.type ?? "",
      tagColor: property.tagColor ?? "",
      description: property.Description ?? "",
    });

    return `/property-show?${params.toString()}`;
  };

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
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-5 py-2 rounded-xl text-sm font-lg transition
              ${active === tab ? "bg-linear-to-r from-[#345578] to-[#284769]" : "bg-white text-gray-600 hover:bg-gray-200"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {filtered.map((property) => (
          <Link
            key={property.id}
            to={propertyLink(property)}
            className="bg-white rounded-2xl overflow-hidden shadow-sm transition hover:scale-105 duration-300 block"
          >

            {/* IMAGE */}
            <div className="h-56 w-full overflow-hidden">
              <img src={property.image} className="w-full h-full object-cover hover:scale-105 transition" alt="" />
            </div>

            {/* CONTENT */}
            <div className="p-6">

              {/* PRICE + TAG */}
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold">
                 $ {property.price}
                  {property.per && (
                    <span className="text-gray-500 text-sm font-normal ml-1">{property.per}</span>
                  )}
                </h3>

                {/* ✅ AUTO TAG STYLE */}
                <span className={`text-xs px-3 py-1 rounded-lg ${getTagStyle(property.type)}`}>
                  {property.type}
                </span>
              </div>

              {/* ADDRESS */}
              <div className="flex items-center text-gray-500 text-sm gap-2 mb-4">
                <MapPin size={16} />
                {property.address}, {getPropertyCity(property)}
              </div>

              {/* INFO */}
              <div className="border-t pt-4 flex justify-between text-gray-600 text-sm">

                <div className="flex items-center gap-2">
                  <Maximize size={16} />
                  {property.sqft}
                </div>

                <div className="flex items-center gap-2">
                  <BedDouble size={16} />
                  {property.beds}
                </div>

                <div className="flex items-center gap-2">
                  <Bath size={16} />
                  {property.baths}
                </div>

              </div>

            </div>
          </Link>
        ))}

      </div>

    </div>
  );
}
