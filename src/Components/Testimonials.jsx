import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const testimonials = [
  {
    name: "Dwayne Duncan",
    role: "Google Review",
    rating: 5,
    text: "I had an excellent experience working with Mack 1 Realty. From the beginning, the team demonstrated a high level of professionalism and genuine commitment to helping me find the right home for me and my family. The company went above and beyond at every stage of the process to answer my questions, address my concerns and ensured that my interests were prioritized. I am eternally grateful for their support as I would not have found my home without their help. Therefore I would highly recommend this firm to anyone who is seeking a reliable, dedicated and client centered firm to help in this most important step of finding a home.",
  },
  {
    name: "Prime Auto Sales & Repair",
    role: "Google Review",
    rating: 5,
    text: "Outstanding experience from start to finish. This real estate agent was knowledgeable, responsive, and truly had our best interests in mind. Communication was excellent, and every step of the process was handled professionally. Highly recommend to anyone looking to buy or sell a home.",
  },
  {
    name: "J",
    role: "Google Review",
    rating: 5,
    text: "I would refer this real estate company to all of my family and friends.",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const next = () => {
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-gray-100 py-4 relative overflow-hidden" data-aos="fade-up" data-aos-delay="100">
      <div className="max-w-6xl mx-auto text-center relative px-4 sm:px-6 lg:px-8">

        {/* Tag */}
        <div className="flex justify-center mt-3">
          <span className="flex items-center gap-2 bg-gray-200 text-lg px-4 py-1 rounded-full mb-5">
            <div className="w-6 h-6 flex items-center justify-center bg-linear-to-r from-[#345578] to-[#284769] text-white rounded-full">
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3.5 h-3.5"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 0C15.522 0 20 4.47803 20 10C20 15.522 15.522 20 10 20C4.47803 20 0 15.522 0 10C0 4.47803 4.47803 0 10 0ZM14.7532 11.3298H14.7558V15.8304C14.7558 16.0074 14.6114 16.1518 14.4344 16.1518H11.5271C11.3501 16.1518 11.2057 16.0074 11.2057 15.8304V13.3833C11.2057 13.2063 11.0613 13.0619 10.8843 13.0619H9.11606C8.93906 13.0619 8.79465 13.2063 8.79465 13.3833V15.8304C8.79465 16.0074 8.65032 16.1518 8.47331 16.1518H5.56598C5.38898 16.1518 5.24457 16.0074 5.24457 15.8304V11.3298H5.24433L7.61512 8.91874L9.75677 6.74087C9.81953 6.67709 9.89654 6.64472 9.98606 6.64472C10.0754 6.64472 10.1524 6.67709 10.2152 6.74087L12.3569 8.91874L14.7532 11.3298ZM10.4598 4.04039L13.7787 7.41559L16.4806 10.1634C16.666 10.352 16.7172 10.6186 16.615 10.8626C16.5126 11.1066 16.2867 11.2569 16.022 11.2569H16.006C15.827 11.2569 15.673 11.1924 15.5476 11.0647L12.8587 8.33016L10.4392 5.86953C10.3137 5.74197 10.1598 5.67732 9.98079 5.67732C9.80181 5.67732 9.64787 5.74197 9.52236 5.86953L7.10268 8.33016C6.20654 9.24165 5.31008 10.1533 4.41394 11.0647C4.40512 11.0738 4.39638 11.0816 4.3878 11.0882C4.27591 11.1869 4.12906 11.2467 3.96819 11.2467C3.61764 11.2467 3.33323 10.9624 3.33323 10.6117C3.33323 10.418 3.42 10.2446 3.55685 10.1281L6.22402 7.41559L9.54291 4.04039C9.66843 3.91276 9.82236 3.84819 10.0014 3.84819C10.1803 3.84819 10.3343 3.91283 10.4598 4.04039Z"
                  />
                </svg>
              </div>
            Testimonials
          </span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Clients <span className="bg-linear-to-r from-[#345578] to-[#284769] bg-clip-text text-transparent">Success</span> Stories
        </h2>

        {/* Description */}
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto ">
          Our clients’ success stories highlight achievements, satisfaction,
          and results, reflecting our expertise, dedication, and trusted partnerships.
        </p>

        {/* Testimonial Card */}
        <div className="mt-16 bg-white rounded-3xl shadow-md p-6 sm:p-8 md:p-10 max-w-2xl mx-auto relative z-10">

          <p className="text-gray-600 leading-relaxed text-lg">
            {testimonials[index].text}
          </p>

          {/* Stars */}
          <div className="flex justify-center gap-2 mt-6 text-yellow-400">
            {[...Array(testimonials[index].rating)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>

        </div>

        {/* Name */}
        <div className="mt-8 flex flex-col items-center">
          <h3 className="text-lg font-semibold">
            {testimonials[index].name}
          </h3>
          <p className="text-gray-500 text-sm">
            {testimonials[index].role}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-10 mt-2">

          <button
            onClick={prev}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow hover:bg-gray-200"
          >
            <FiChevronLeft />
          </button>

          <button
            onClick={next}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow hover:bg-gray-200"
          >
            <FiChevronRight />
          </button>

        </div>

      </div>
    </section>
  );
}
