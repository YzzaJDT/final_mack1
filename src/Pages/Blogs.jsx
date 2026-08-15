import React from "react";
import Navbar from "../Components/Navbar";
import BlogCard from "../Components/BlogCard";
import Footer from "../Components/Footer";

export default function Blogs() {

  return (
    <>
      <div className="relative min-h-screen w-full text-white overflow-hidden">

        <Navbar />

        <div className="absolute inset-0">
  <img
    src="/images/bg6.jpg"
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
          className="relative z-10 flex items-center h-full px-6 md:px-12 lg:px-24 pt-32 lg:pt-40 mt-20"
          data-aos="fade-up"
        >

          {/* LEFT TEXT */}
          <div className="max-w-3xl">

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold drop-shadow-lg">
              Our <span className="text-orange-500"> Blogs </span>
            </h1>
          </div>
        </div>
      </div>


    <BlogCard />
    <Footer/>
    </>
  );
}
