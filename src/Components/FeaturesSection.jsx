import React from "react";

const features = [
  { icon: "/images/icon1.png", title: "Find Your Perfect Home Faster", description: "Explore properties with smart search features that help you narrow down choices and save valuable time." },
  { icon: "/images/icon2.png", title: "A Wide Range of Properties", description: "Browse thousands of trusted listings across various cities to discover homes that match your needs and lifestyle." },
  { icon: "/images/icon3.png", title: "Connect with Trusted Experts", description: "Partner with skilled real estate professionals who understand the market and prioritize your needs." },
  { icon: "/images/icon4.png", title: "Quick & Effortless Experience", description: "From exploring listings to finalizing your purchase, everything is designed to be smooth, fast, and hassle-free." },
  { icon: "/images/icon5.png", title: "Fully Transparent Pricing", description: "We provide complete pricing information on every listing so you can decide with confidence." },
  { icon: "/images/icon6.png", title: "Customer Support", description: "From questions to concerns, our support team is always here to assist you." },
];

export default function FeaturesSection() {
  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-20" data-aos="fade-up" data-aos-delay="100">
      <div className="max-w-7xl mx-auto ">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">
        Explore the{" "}
          <span className="bg-linear-to-r from-[#345578] to-[#284769] bg-clip-text text-transparent">Exceptional Services</span> <br />
        We Offer at Mack1
        </h2>

        <p className="text-gray-500 max-w-xl mx-auto mb-12 text-sm sm:text-base text-center">
        Combining innovation, local market knowledge, and personalized support to help you find the right property with ease.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={feature.icon}
                alt={feature.title}
                className="mb-4 object-cover rounded-md "
              />
              <h3 className="font-semibold bg-linear-to-r from-[#345578] to-[#284769] bg-clip-text text-transparent mb-2 text-2xl">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
