import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "What Is Mack 1 Realty?",
    answer:
      "Mack 1 Realty is a modern real estate platform designed to help you easily find, compare, and connect with the right property.",
  },
  {
    question: "Does Mack 1 Realty offer both rental and for-sale listings?",
    answer:
      "Yes, Mack 1 Realty lets you easily search for both rental properties and homes for sale using smart filters.",
  },
  {
    question: "How frequently are property listings updated?",
    answer:
      "Listings are regularly refreshed to ensure you always see accurate and current property availability.",
  },
  {
    question: "Can I Contact An Agent Through Mack 1 Realty?",
    answer:
      "Yes, you can directly contact through the contacts section.",
  },
];

export default function FaqSection() {
  const [active, setActive] = useState(null);

  const toggle = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className="bg-gray-100 py-24 px-6" data-aos="fade-up" data-aos-delay="100">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">

        {/* LEFT SIDE */}
        <div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Frequently <span className="bg-linear-to-r from-[#345578] to-[#284769] bg-clip-text text-transparent">Asked</span>
            <br />
            Questions
          </h2>

          {/* Description */}
          <p className="text-gray-500 mt-4">
            We’re here to help answer your real estate questions and concerns.
          </p>

          {/* Contact Box */}
          <div className="mt-12">
            <h4 className="font-semibold text-lg">
              Still Have A Question?
            </h4>

            <p className="text-gray-500 mt-2">
              Dont worry we’re free for consultation, just click button below.
            </p>

            <Link
              to="/ConsultationPage"
              className="inline-flex items-center mt-5 gap-2 bg-linear-to-r from-[#345578] to-[#284769] text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-lg hover:scale-105 transition w-fit"
            >
              Get Consultation
              <span className="text-base">→</span>
            </Link>

          </div>

        </div>

        {/* RIGHT SIDE FAQ */}
        <div className="space-y-4">

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-300 pb-4"
            >

              <button
                onClick={() => toggle(index)}
                className="flex justify-between items-center w-full text-left text-lg font-medium"
              >
                {faq.question}
                <FiChevronDown
                  className={`transition-transform ${active === index ? "rotate-180" : ""
                    }`}
                />
              </button>

              {active === index && (
                <p className="text-gray-500 mt-3 pr-6">
                  {faq.answer}
                </p>
              )}

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
