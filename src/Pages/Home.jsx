import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import PremiumListings from "../Components/PremiumListings";
import FeaturesSection from "../Components/FeaturesSection";
import AboutSection from "../Components/AboutSection";
import Testimonials from "../Components/Testimonials";
import FaqSection from "../Components/FaqSection";
import Footer from "../Components/Footer";

const bg3 = "/images/pic6.jpg";

export default function Home() {
  const images = [
    "/images/pic1.jpg",
    "/images/pic2.jpg",
    "/images/pic3.jpg",
    "/images/pic4.jpg",
    "/images/pic5.jpg",
    "/images/pic6.jpg",
  ];

  const [current, setCurrent] = useState(0);

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };
  return (
    <>
<div className="relative min-h-screen w-full overflow-x-hidden text-white">

  <Navbar />

  {/* Background Image */}
<div className="absolute inset-0">
  <img
    src={bg3}
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


  {/* Hero Content */}
 <div
  className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center min-h-screen px-6 md:px-12 lg:px-24 pt-32 lg:pt-40"
  data-aos="fade-up"
>

    {/* LEFT TEXT */}
    <div className="w-full max-w-xl lg:max-w-3xl">

      {/* Title */}
      <h1 className="text-2xl sm:text-5xl md:text-3xl lg:text-7xl font-bold">
          Discover{" "}
          <span className="bg-linear-to-r from-[#345578] to-[#284769] bg-clip-text text-transparent">
            Spaces
          </span>{" "}
          <span className="bg-linear-to-r from-[#345578] to-[#284769] bg-clip-text text-transparent">
            Designed
          </span>{" "}
          for Your Life
        </h1>

      {/* Description */}
      <p className="mt-4 text-sm sm:text-base max-w-2xl text-white/90">
        Homes that adapt to your lifestyle today, tomorrow, and every step in between. Thoughtfully designed spaces that grow with your needs, offering comfort, functionality, and the freedom to live the way you envision.
      </p>

    </div>

    {/* PROPERTY SLIDER (HIDDEN ON MOBILE/TABLET) */}
    <div className="hidden lg:block lg:absolute lg:right-10 xl:right-20">

      <div className="w-72 xl:w-80">

        {/* Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={images[current]}
            className="h-60 w-full object-cover"
            alt=""
          />
        </div>

        {/* PREV NEXT */}
        <div className="flex justify-between items-center text-white/80 text-lg mt-1.5">

          <span
            onClick={prevImage}
            className="cursor-pointer hover:text-[#375b7d] transition"
          >
            PREV
          </span>

          <span
            onClick={nextImage}
            className="cursor-pointer hover:text-white transition"
          >
            NEXT
          </span>

        </div>

      </div>

      {/* Button */}
      <Link
       className="mt-5 w-full block text-center py-3 rounded-xl font-semibold text-white
       bg-linear-to-r from-[#345578] to-[#284769]
        shadow-lg hover:scale-105 transition"
        to="/Properties"
      >
        Browse Properties
      </Link>

    </div>

  </div>

</div>



    <PremiumListings/>
    <FeaturesSection />
    <AboutSection />
    <Testimonials />
    <FaqSection/>
    <Footer/>


    </>
  );
}
