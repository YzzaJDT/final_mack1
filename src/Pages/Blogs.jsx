import React from "react";
import Navbar from "../Components/Navbar";
import HeroBackdrop from "../Components/HeroBackdrop";
import BlogCard from "../Components/BlogCard";
import Footer from "../Components/Footer";

export default function Blogs() {

  return (
    <>
      <div className="relative min-h-screen w-full text-white overflow-hidden">

        <Navbar />

        <HeroBackdrop image="/images/bg6.jpg" />



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
