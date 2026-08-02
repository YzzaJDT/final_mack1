import React from "react";

export default function LogoMarquee() {
  const logos = [
    "/images/logo1.jpg",
    "/images/logo2.jpg",
    "/images/logo3.jpg",
    "/images/logo4.jpg",
    "/images/logo5.jpg",
    "/images/logo6.jpg",
  ];

  return (
    <section className="bg-[#f6f6f6] py-10 ">
      <div className="max-w-7xl mx-auto px-6">

        <div className="marquee mb-16">
          <div className="marquee-track">

            {logos.map((logo, i) => (
              <img key={i} src={logo} className="h-10" alt="" />
            ))}

            {logos.map((logo, i) => (
              <img key={`dup-${i}`} src={logo} className="h-8" alt="" />
            ))}

          </div>
        </div>

      </div>

    </section>
  );
}
