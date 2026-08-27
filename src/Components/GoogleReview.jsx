import React from "react";
import { FaStar, FaGoogle } from "react-icons/fa";
import { GOOGLE_URLS } from "../lib/google";
import GoogleBusinessCard from "./GoogleBusinessCard";

export default function GoogleReview() {
  // Google's review dialog cannot accept a pre-selected rating, so whichever star is
  // clicked the visitor still picks their own on Google's side.
  //
  // TODO: decide what a click should do. Three viable routes:
  //   1. Every rating opens Google directly (simplest, treats all feedback the same).
  //   2. Low ratings open /ConsultationPage instead so the office hears it privately --
  //      note Google's Business Profile policy prohibits this kind of review gating.
  //   3. Low ratings open Google too, but after a short "we'd love to make it right" note.
  const handleStarClick = (rating) => {
    window.open(GOOGLE_URLS.writeReview, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="bg-gray-100 pt-12 pb-16 px-6" data-aos="fade-up" data-aos-delay="100">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-start">

        <GoogleBusinessCard />

        {/* Review CTA */}
        <div className="bg-white rounded-3xl shadow-md p-6 sm:p-8 md:p-10 text-center">

          {/* Google mark */}
          <div className="flex justify-center">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-linear-to-r from-[#345578] to-[#284769] text-white">
              <FaGoogle size={20} />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-bold mt-5">
            Share Your{" "}
            <span className="bg-linear-to-r from-[#345578] to-[#284769] bg-clip-text text-transparent">
              Experience
            </span>
          </h3>

          {/* Description */}
          <p className="text-gray-500 mt-3">
            Worked with us on a home? Leave a review on our Google profile and help
            the next family find the right team.
          </p>

          {/* Rating picker */}
          <div className="flex justify-center gap-3 mt-7 text-yellow-400">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleStarClick(rating)}
                aria-label={`Leave a ${rating} star review on Google`}
                className="text-2xl hover:scale-125 transition cursor-pointer"
              >
                <FaStar />
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col items-center gap-4 mt-8">

            <a
              href={GOOGLE_URLS.writeReview}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-linear-to-r from-[#345578] to-[#284769] text-white px-6 py-3 rounded-xl text-sm font-medium shadow-lg hover:scale-105 transition"
            >
              Write A Google Review
              <span className="text-base">→</span>
            </a>

            <a
              href={GOOGLE_URLS.profile}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-[#345578] transition"
            >
              Read all reviews on Google
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}
