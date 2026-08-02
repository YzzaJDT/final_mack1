import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-black text-white pt-32 pb-10 px-6">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/house.jpg"
          alt="background"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto">

        {/* Top Card */}
        <div className="bg-linear-to-r from-[#11161b] via-[#1a222a] to-[#11161b] text-gray-800 rounded-2xl shadow-lg p-8 md:p-10 flex flex-col md:flex-row justify-between gap-10 mb-20">

          {/* Left */}
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-[#345578] text-white p-2 rounded-full"></div>
             <img
                  src="/images/mainlogo.png"
                  alt="Mack1 Logo"
                  className="h-15 w-auto object-contain"
                />
            </div>

            <p className="text-sm text-white leading-relaxed">
              Quality homes built to suit your lifestyle, offering comfort, space, and flexibility.
            </p>
          </div>

          {/* Address */}
          <div>
            <h4 className="font-semibold mb-3 text-white">Address</h4>
            <p className="text-sm text-white leading-relaxed">
               1097 lido Drive Howey in the Hills, 34737
            </p>
          </div>

          {/* Contact */}
            <div>
              <h4 className="font-semibold mb-3 text-white">Contact</h4>

              <p className="text-sm text-white leading-relaxed">
                Email: mack1@mack1realtygroup.com <br />
                Phone: (352) 346-2105 / (855) 622-5001
              </p>

              <div className="flex items-center gap-4 mt-3">
                <a
                  href="https://www.facebook.com/mack1realtygroup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-600 transition"
                >
                  <FaFacebookF size={18} />
                </a>

                <a
                  href="https://www.instagram.com/mack1_realty/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-pink-500 transition"
                >
                  <FaInstagram size={18} />
                </a>
              </div>
            </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© 2025 Mack1. All Rights Reserved</p>

          <p className="mt-2 md:mt-0">
           Built, Owned, and Powered by Our Team.
          </p>
        </div>

      </div>
    </footer>
  );
}
