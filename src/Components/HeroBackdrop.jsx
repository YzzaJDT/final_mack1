import React from "react";

// Opaque at the left and right margins, clear through the middle, so the masked
// backdrop-blur layer only softens the outer edges and leaves the subject sharp.
const EDGE_BLUR_MASK =
  "linear-gradient(to right, #000 0%, transparent 15%, transparent 85%, #000 100%)";

// Full-bleed hero background shared by every page hero. Expects a positioned parent.
export default function HeroBackdrop({ image, alt = "Modern real estate website background" }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <img src={image} className="w-full h-full object-cover object-center" alt={alt} />

      {/* Edge softening. backdrop-blur blurs the photo painted behind this layer; the mask
          decides where that blur has any alpha, so the transition stays seamless. */}
      <div
        className="absolute inset-0 backdrop-blur-lg"
        style={{ maskImage: EDGE_BLUR_MASK, WebkitMaskImage: EDGE_BLUR_MASK }}
      ></div>

      {/* Reading scrim. Near-solid under the headline and gone by mid-frame on large screens,
          where the property slider needs the photo to show through on the right. Below lg
          there's no competing content over there -- the slider is hidden -- so the scrim
          stays strong across the full width instead of washing out wrapped headline text. */}
      <div className="absolute inset-0 bg-linear-to-r from-[#0b1f3a]/95 from-0% via-[#0b1f3a]/75 via-50% to-[#0b1f3a]/65 to-100% lg:via-[#0b1f3a]/50 lg:via-38% lg:to-transparent lg:to-72%"></div>

      {/* Vertical settle. Anchors the navbar at the top and the section seam at the bottom. */}
      <div className="absolute inset-0 bg-linear-to-b from-[#0b1f3a]/55 via-transparent via-40% to-[#0b1f3a]/70"></div>
    </div>
  );
}
