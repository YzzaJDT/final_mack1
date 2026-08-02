import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-linear-to-r from-[#11161b] via-[#1a222a] to-[#11161b] shadow-lg shadow-black/20">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-12 py-4">

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src="/images/mainlogo.png"
            alt="Mack1 Logo"
            className="h-10 sm:h-12 md:h-16 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8 lg:gap-10 text-base font-medium text-white">
          <li>
            <Link to="/" className="relative transition duration-300 hover:text-[#375b7d]">
              Home
              {pathname === "/" && <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-red-800"></span>}
            </Link>
          </li>

          <li>
            <Link to="/Properties" className="relative transition duration-300 hover:text-[#375b7d]">
              Properties
              {pathname.startsWith("/Properties") && <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-red-800"></span>}
            </Link>
          </li>

          <li>
            <Link to="/Location" className="relative transition duration-300 hover:text-[#375b7d]">
              Locations
              {pathname.startsWith("/Location") && <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-red-800"></span>}
            </Link>
          </li>

          <li>
            <Link to="/About" className="relative transition duration-300 hover:text-[#375b7d]">
              About Us
              {pathname.startsWith("/About") && <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-red-800"></span>}
            </Link>
          </li>

          <li>
            <Link to="/Blogs" className="relative transition duration-300 hover:text-[#375b7d]">
              Blogs
              {pathname.startsWith("/Blogs") && <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-red-800"></span>}
            </Link>
          </li>
        </ul>

        {/* Desktop Contact Button */}
        <Link
          to="/About"
          className="hidden md:block px-6 py-3 rounded-xl font-semibold text-white bg-linear-to-r from-[#345578] to-[#284769] shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Contact Us
        </Link>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5 p-2 flex-shrink-0"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-opacity ${isOpen ? "opacity-0" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#11161b] text-white px-6 pb-6 w-full">
          <ul className="flex flex-col gap-5 text-base font-medium">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Properties">Properties</Link></li>
            <li><Link to="/Location">Locations</Link></li>
            <li><Link to="/About">About Us</Link></li>
            <li><Link to="/Blogs">Blogs</Link></li>

            <li>
              <Link
                to="/About"
                className="block w-full text-center px-6 py-3 rounded-xl font-semibold bg-linear-to-r from-[#345578] to-[#284769]"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
