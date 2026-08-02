import React from "react";

export default function HeroSection() {
  return (
    <section className="bg-[#f6f6f6] py-20" data-aos="fade-up" data-aos-delay="100">
      <div className="max-w-5xl mx-auto px-6 text-center">

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900">
          Shaping the{" "}
          <span className="bg-linear-to-r from-[#345578] to-[#284769] bg-clip-text text-transparent">Future</span> of Real
          <br />
          Estate & Architecture
        </h1>

        {/* Subtitle */}
        <p className="bg-linear-to-r from-[#345578] to-[#284769] bg-clip-text text-transparent mt-4 max-w-2xl mx-auto text-sm md:text-base">
         Delivering modern, high-quality spaces with innovation, transparency, and a focus on our customers.
        </p>

        {/* Image */}
        <div className="mt-10">
          <img
            src="/images/bg4.jpg"
            alt="house"
            className="w-full h-[300px] md:h-[400px] object-cover rounded-2xl shadow-md"
          />
        </div>

      </div>
    </section>
  );
}
