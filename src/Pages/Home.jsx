import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchListings } from "../lib/listings";
import Navbar from "../Components/Navbar";
import PremiumListings from "../Components/PremiumListings";
import FeaturesSection from "../Components/FeaturesSection";
import AboutSection from "../Components/AboutSection";
import Testimonials from "../Components/Testimonials";
import FaqSection from "../Components/FaqSection";
import Footer from "../Components/Footer";

const bg3 = "/images/pic6.jpg";

// Only ever shown if the feed fails or comes back empty -- never while it is still
// loading. Showing a stock photo during the fetch made a decorative image read as a
// listing for a second before swapping to a real one, which looks broken.
const FALLBACK_IMAGES = [
  "/images/pic1.jpg",
  "/images/pic2.jpg",
  "/images/pic3.jpg",
  "/images/pic4.jpg",
  "/images/pic5.jpg",
  "/images/pic6.jpg",
];

export default function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let cancelled = false;

    fetchListings()
      .then((data) => {
        if (cancelled) return;
        // The hero advertises what a buyer can act on today; sold listings still belong
        // on the Properties page, just not on the front door. If nothing is live, show
        // everything rather than an empty carousel.
        const live = data.filter((listing) => listing.status !== "sold");
        // Capped: a hero carousel nobody clicks through twenty times does not need every
        // listing, and the cap bounds the preload below.
        setListings((live.length ? live : data).slice(0, 6));
      })
      .catch(() => {
        if (!cancelled) setListings([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Only the current slide's <img> is ever in the DOM, so clicking NEXT used to start a
  // fresh download of a full-size photo. Price and address come from JSON already in
  // memory and paint instantly, which is exactly what made the image look laggy behind
  // them. Warming the rest here -- after the first paint, so it never delays the hero
  // itself -- means the swap is served from cache. Only bites on first visit; after that
  // the browser cache covers it.
  useEffect(() => {
    for (const item of listings) {
      if (!item.image_url) continue;
      const img = new Image();
      img.src = item.image_url;
    }
  }, [listings]);

  const slideCount = listings.length || FALLBACK_IMAGES.length;
  // Modulo on read, so a click made against the fallback count cannot land out of range
  // once the (usually shorter) real list arrives.
  const listing = listings.length ? listings[current % listings.length] : null;

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % slideCount);
  };

  const prevImage = () => {
    setCurrent((prev) => (prev - 1 + slideCount) % slideCount);
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

        {/* Image. A neutral placeholder holds the slot while the feed loads -- showing a
            stock photo here made it read as a listing until the real one replaced it. */}
        {loading ? (
          <div className="h-60 w-full rounded-2xl bg-white/10 animate-pulse shadow-2xl" />
        ) : (
        <Link
          to={listing ? `/property-show?id=${listing.id}` : "/Properties"}
          className="relative rounded-2xl overflow-hidden shadow-2xl block group"
        >
          <img
            src={listing ? listing.image_url || "/images/house.jpg" : FALLBACK_IMAGES[current]}
            className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
            alt={listing ? listing.displayAddress : ""}
          />

          {listing && (
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/40 to-transparent px-4 pt-8 pb-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-lg font-semibold">{listing.priceLabel}</span>
                <span className="text-[10px] uppercase tracking-wide text-white/70">
                  {listing.isRental ? "For Rent" : "For Sale"}
                </span>
              </div>
              <div className="text-xs text-white/80 truncate">{listing.fullAddress}</div>
            </div>
          )}
        </Link>
        )}

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
