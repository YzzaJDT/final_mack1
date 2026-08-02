import React from "react";

const properties = [
  {
    id: 1,
    image: "/images/house1.jpg",
    price: "$2,600",
    type: "month",
    status: "For Rent",
    location: "14 Montlake View Rd, Geneva",
    beds: 2,
    baths: 2,
    size: "1,050 SQFT",
  },
  {
    id: 2,
    image: "/images/house2.jpg",
    price: "$1,350,000",
    type: "",
    status: "For Sale",
    location: "26 Alpenstrasse Crest, Zurich",
    beds: 3,
    baths: 2,
    size: "1,300 SQFT",
  },
  {
    id: 3,
    image: "/images/house3.jpg",
    price: "$1,900",
    type: "month",
    status: "For Rent",
    location: "91 Harbor Point Rd, Toronto, ON",
    beds: 2,
    baths: 2,
    size: "1,000 SQFT",
  },
];

export default function ViewMore() {
  return (
    <section className=" px-6 md:px-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold">
          View More
        </h2>

        <button className="hidden md:flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm shadow-md transition">
          View All Properties →
        </button>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {properties.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm"
          >
            {/* Image */}
            <img
              src={item.image}
              alt=""
              className="w-full h-52 object-cover"
            />

            {/* Content */}
            <div className="p-4">
              {/* Price + Badge */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">
                  {item.price}
                  {item.type && (
                    <span className="text-sm text-gray-500 font-normal">
                      /{item.type}
                    </span>
                  )}
                </h3>

                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    item.status === "For Rent"
                      ? "bg-purple-100 text-purple-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              {/* Location */}
              <p className="text-sm text-gray-500 mb-3">
                📍 {item.location}
              </p>

              {/* Info */}
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>📐 {item.size}</span>
                <span>🛏 {item.beds} Beds</span>
                <span>🛁 {item.baths} Baths</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Button */}
      <div className="mt-8 md:hidden">
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl text-sm shadow-md transition">
          View All Properties →
        </button>
      </div>
    </section>
  );
}
