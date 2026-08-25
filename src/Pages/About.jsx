import React from "react";
import Navbar from "../Components/Navbar";
import HeroBackdrop from "../Components/HeroBackdrop";
import AboutSection from "../Components/AboutSection";
import HeroSection from "../Components/HeroSection";
import Expertise from "../Components/Expertise";
import TeamSection from "../Components/TeamSection";
import Footer from "../Components/Footer";

export default function About() {

  return (
    <>
      <div className="relative min-h-screen w-full text-white overflow-hidden">

        <Navbar />

        <HeroBackdrop image="/images/bg5.jpg" />

        {/* ✅ Content */}
        <div
          className="relative z-10 flex items-center h-full px-6 md:px-12 lg:px-24 pt-32 lg:pt-40 mt-20"
          data-aos="fade-up"
        >

          {/* LEFT TEXT */}
          <div className="max-w-3xl">

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold drop-shadow-lg">
             Discover Your  <span className="bg-linear-to-r from-[#a9d0f5] to-[#7fb0da] bg-clip-text text-transparent"> Perfect </span> Property
            </h1>

          </div>
        </div>

      </div>

          <AboutSection/>
          <HeroSection />
          <Expertise />
          <TeamSection />
    <Footer/>
    </>
  );
}
