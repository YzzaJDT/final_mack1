import React from "react";
import { Link } from "react-router-dom";

export default function AboutSection() {
  return (
    <section className="bg-[#f6f6f6] py-12 sm:py-16 lg:py-20" data-aos="fade-up" data-aos-delay="100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* Left Image */}
        <div className="rounded-2xl overflow-hidden order-1 lg:order-none">
          <img
            src="/images/house.jpg"
            alt="Luxury House"
            className="w-full h-[260px] sm:h-[350px] md:h-[420px] lg:h-[500px] object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="text-center lg:text-left">

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-6">
            Understand {" "}
            <span className="bg-linear-to-r from-[#345578] to-[#284769] bg-clip-text text-transparent">Our Purpose </span>{" "}
            and the Real Estate Solutions We Offer
          </h2>

          {/* Paragraphs */}
          <p className="text-gray-500 text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed max-w-xl mx-auto lg:mx-0">
         Mack1 simplifies your journey to finding the perfect home. With a modern design and
         intuitive search features, you can easily explore neighborhoods, compare properties,
         and find options that match your lifestyle.
  </p>

          <p className="text-gray-500 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
            Whether you're buying, renting, or simply exploring, Nextora provides a seamless
            and transparent experience—empowering you to make confident real estate decisions.

          </p>

          {/* Button */}
          <div className="flex justify-center lg:justify-start">
            <Link
            to="/ConsultationPage"
            className="flex items-center gap-2 sm:gap-3 bg-linear-to-r from-[#345578] to-[#284769] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-medium shadow-lg hover:scale-105 transition">
              GET CONSULTATION
              <span className="text-base sm:text-lg">→</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
