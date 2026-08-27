import React from "react";
import Navbar from "../Components/Navbar";
import HeroBackdrop from "../Components/HeroBackdrop";
import FilterTabs from "../Components/FilterTabs";
import Footer from "../Components/Footer";

export default function Properties() {

  return (
    <>
      <div className="relative min-h-screen w-full text-white overflow-hidden">

        <Navbar />

        <HeroBackdrop image="/images/bg2.jpg" />

        {/* ✅ Content */}
        <div
          className="relative z-10 flex items-center h-full px-6 md:px-12 lg:px-24 pt-32 lg:pt-40 mt-20"
          data-aos="fade-up"
        >

          {/* LEFT TEXT */}
          <div className="max-w-3xl">

            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold drop-shadow-lg">
              Make Every Spaces
              <br />
            <span className="bg-linear-to-r from-[#a9d0f5] to-[#7fb0da] bg-clip-text text-transparent">Unique</span> and   <span className="bg-linear-to-r from-[#a9d0f5] to-[#7fb0da] bg-clip-text text-transparent">Inspiring</span>
            </h1>

            {/* Description */}
            <p className="mt-4 text-base sm:text-lg max-w-2xl text-white/90">
              Your life evolves, and your home should too. We design flexible
              living spaces that adapt to your current needs and accommodate
              your evolving aspirations for the future.
            </p>

          </div>
        </div>

      </div>
 {/* Tabs */}
       <div className="min-h-screen bg-gray-100 px-6 md:px-16 py-10">
          <FilterTabs />
        </div>
    <Footer/>
    </>
  );
}
