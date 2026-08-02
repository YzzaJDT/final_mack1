import React from "react";
import Navbar from "../Components/Navbar";
import LocationSection from "../Components/LocationSection";
import Footer from "../Components/Footer";
import { FaHome } from "react-icons/fa";

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

  {/* Main dark + blue gradient overlay */}
  <div className="absolute inset-0 bg-linear-to-r from-[#0b1f3a]/80 via-[#0b1f3a]/60 to-black/60"></div>

  {/* Soft blue branding glow */}
  <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay"></div>
</div>


        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* ✅ Content */}
        <div
          className="relative z-10 flex items-center h-full px-6 md:px-12 lg:px-24 pt-32 lg:pt-40 mt-20"
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
              The Right  <span className="bg-linear-to-r from-[#345578] to-[#284769] bg-clip-text text-transparent">Property Starts  </span> Here
            </h1>

          </div>
        </div>

      </div>
 {/* LocationSection */}
       <div className="min-h-screen bg-gray-100 px-6 md:px-16 py-10">
          <LocationSection />
        </div>
    <Footer/>
    </>
  );
}
