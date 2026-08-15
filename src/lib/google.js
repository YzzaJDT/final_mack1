// Google Business Profile details for the Clermont office. The place ID is derived from
// the CID pair in the office Maps link and is permanent; the rating and review count are
// a manual snapshot and need a refresh whenever a new review lands.
export const GOOGLE_PLACE_ID = "ChIJWaU2o0LnoAkRfFJHfsloLng";

export const GOOGLE_BUSINESS = {
  name: "Mack 1 Realty",
  category: "Real estate agent in Clermont, Florida",
  // Matches the Google profile exactly -- local search ranking depends on the address
  // reading the same here as it does on Google.
  address: "1230 Oakley Seaver Dr Ste 101, Clermont, FL 34711, United States",
  phone: "(855) 622-5001",
  phoneHref: "tel:+18556225001",
  rating: 5.0,
  reviewCount: 5,
  ratingCheckedOn: "2026-08-14",
};

export const GOOGLE_URLS = {
  writeReview: `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`,
  profile: `https://www.google.com/maps/place/?q=place_id:${GOOGLE_PLACE_ID}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination_place_id=${GOOGLE_PLACE_ID}&destination=${encodeURIComponent(
    "Mack 1 Realty, Clermont, FL"
  )}`,
  // Keyless embed, so the site needs no Maps API key or billing account.
  mapEmbed: "https://maps.google.com/maps?q=28.5482701,-81.7294363&z=17&output=embed",
};
