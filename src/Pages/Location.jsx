import React from "react";
import Navbar from "../Components/Navbar";
import LocationSection from "../Components/LocationSection";
import Footer from "../Components/Footer";
import { FaHome, FaMapMarkerAlt } from "react-icons/fa";

// Service area shown in the hero, independent of what the MLS feed currently returns.
const SERVICE_AREAS = [
  { name: "Orlando", image: "/images/orlando.jpg" },
  { name: "Clermont", image: "/images/clermont.jpg" },
  { name: "Lake County", image: "/images/lake-county.jpg" },
  { name: "Surrounding Central Florida Communities", image: "/images/florida.jpg" },
];

export default function Location() {

  return (
    <>
      <div className="relative min-h-screen w-full text-white overflow-hidden">

        <Navbar />

        <div className="absolute inset-0">
  <img
    src="/images/bg1.jpg"
    className="w-full h-full object-cover object-center"
    alt="Modern real estate website background"
  />

  {/* Main dark + blue gradient overlay, kept light so the photo reads through. */}
  <div className="absolute inset-0 bg-linear-to-r from-[#0b1f3a]/60 via-[#0b1f3a]/55 to-black/55"></div>

  {/* Soft blue branding glow */}
  <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay"></div>
</div>

        {/* ✅ Content */}
        <div
          className="relative z-10 flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-32 lg:pt-40 pb-20 mt-20"
          data-aos="fade-up"
        >

          {/* LEFT TEXT */}
          <div className="max-w-3xl">

            {/* Tag */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg px-4 py-1 rounded-full w-fit text-white text-sm">
              <FaHome className="w-4 h-4" />
             Locations
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold drop-shadow-lg">
              The Right  <span className="bg-linear-to-r from-[#a9d0f5] to-[#7fb0da] bg-clip-text text-transparent">Property Starts  </span> Here
            </h1>

          </div>

          {/* SERVICE AREAS */}
          <div className="mt-12 w-full max-w-6xl">

            <h2 className="text-2xl sm:text-3xl font-bold drop-shadow-lg mb-6">
              <span className="bg-linear-to-r from-[#a9d0f5] to-[#7fb0da] bg-clip-text text-transparent">Serving</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SERVICE_AREAS.map((area) => (
                <div
                  key={area.name}
                  className="relative h-48 rounded-2xl overflow-hidden border border-white/15 group transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <img
                    src={area.image}
                    alt={area.name}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-transparent"></div>
                  <div className="absolute inset-x-0 bottom-0 flex items-start gap-2 p-4 transition duration-300 group-hover:-translate-y-1">
                    <FaMapMarkerAlt className="w-4 h-4 mt-1 shrink-0 text-[#7fa6cd]" />
                    <span className="font-semibold text-base sm:text-lg leading-snug drop-shadow-lg">{area.name}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
 {/* LocationSection brings its own background and padding, and renders nothing
     when the feed has no cities. */}
      <LocationSection />
    <Footer/>
    </>
  );
}
