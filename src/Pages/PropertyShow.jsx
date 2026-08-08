import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import Navbar from "../Components/Navbar";
import ContactAgent from "../Components/ContactAgent";
import ListingCard from "../Components/ListingCard";
import { fetchListingById, fetchListings, pickMoreListings } from "../lib/listings";

const STATUS_STYLES = {
  available: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  sold: "bg-gray-200 text-gray-600",
};

// Only the facts the IDX feed actually supplies; anything null is dropped rather than
// rendered as an empty row.
function detailRows(listing) {
  return [
    ["Property type", listing.sub_type],
    ["Year built", listing.year_built],
    ["Lot size", listing.acreage ? `${listing.acreage} acres` : null],
    ["Garage", listing.garage ? `${listing.garage} spaces` : null],
    ["Pool", listing.pool ? "Yes" : null],
    ["Waterfront", listing.waterfront ? "Yes" : null],
    ["HOA dues", listing.hoa_dues ? `$${listing.hoa_dues.toLocaleString()}` : null],
    ["Days on market", listing.days_on_market],
    ["MLS #", listing.mls_number],
  ].filter(([, value]) => value !== null && value !== undefined && value !== "");
}

// Decides whether the "more photos below" arrow shows over the thumbnail rail.
// Runs on mount, on resize, and on every scroll of the rail.
function shouldShowScrollHint(rail) {
  const { scrollTop, clientHeight, scrollHeight } = rail;
  // The slack absorbs sub-pixel rounding, which otherwise leaves the arrow stuck on at
  // the bottom of the rail.
  return scrollHeight - scrollTop - clientHeight > 40;
}

export default function PropertyShow() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [moreListings, setMoreListings] = useState([]);
  const railRef = useRef(null);

  useEffect(() => {
    if (!id) {
      setError("No property specified.");
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    fetchListingById(id)
      .then((data) => {
        if (cancelled) return;
        if (!data) setError("This property is no longer available.");
        setListing(data);
        setActiveImage(0);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  // Tile heights are fixed in CSS, so the rail's scroll height settles before the lazy
  // thumbnails load; measuring per listing and on resize is enough.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const measure = () => setShowScrollHint(shouldShowScrollHint(rail));
    measure();

    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [listing]);

  // Recommendations are a bonus, not core to the page, so a failure here is silent rather
  // than surfacing an error state alongside the listing itself.
  useEffect(() => {
    if (!listing) return;

    let cancelled = false;
    fetchListings()
      .then((all) => {
        if (!cancelled) setMoreListings(pickMoreListings(all, listing));
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [listing]);

  if (loading || error || !listing) {
    return (
      <>
        <Navbar />
        <section data-nav="light" className="min-h-screen bg-white">
          <div className="px-4 md:px-10 py-6 pt-40 text-center">
            {loading ? (
              <p className="text-gray-500">Loading property...</p>
            ) : (
              <>
                <p className="text-gray-700 mb-6">{error}</p>
                <Link
                  to="/Properties"
                  className="inline-block bg-linear-to-r from-[#345578] to-[#284769] text-white px-6 py-3 rounded-xl"
                >
                  Browse all properties
                </Link>
              </>
            )}
          </div>
        </section>
      </>
    );
  }

  const images = listing.images.length ? listing.images : ["/images/house.jpg"];
  const details = detailRows(listing);

  return (
    <>
      <Navbar />
      <section data-nav="light" className="min-h-screen bg-white mt-10">

        <div className="px-4 md:px-10 py-6 pt-24">

          {/* Top Bar */}
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <div className="text-sm text-gray-500">
              <Link to="/" className="hover:underline">Home</Link>
              <span className="mx-2">-</span>
              <Link to="/Properties" className="hover:underline">Properties</Link>
              <span className="mx-2">-</span>
              <span className="text-gray-800 font-medium">
                {listing.displayAddress}
              </span>
            </div>

            <span
              className={`text-xs px-3 py-1 rounded-lg capitalize ${STATUS_STYLES[listing.status] ?? "bg-gray-100 text-gray-600"
                }`}
            >
              {listing.statusText}
            </span>
          </div>

          {/* Gallery. A land listing may carry a single photo while a house carries 44,
              so the main image takes the full width when there is nothing to browse. */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className={images.length > 1 ? "lg:col-span-2" : "lg:col-span-3"}>
              <img
                src={images[activeImage]}
                className="w-full h-[250px] sm:h-[350px] lg:h-[420px] object-cover rounded-2xl"
                alt={listing.displayAddress}
              />
            </div>

            {images.length > 1 && (
              // self-start keeps the wrapper hugging the rail so the fade anchors to the
              // last visible tile, not to the taller main image beside it.
              <div className="relative self-start">
                {/* auto-rows-min stops a short rail from stretching its tiles to fill. */}
                <div
                  ref={railRef}
                  onScroll={(event) =>
                    setShowScrollHint(shouldShowScrollHint(event.currentTarget))
                  }
                  className="grid grid-cols-2 gap-4 auto-rows-min max-h-[420px] overflow-y-auto"
                >
                  {images.map((src, index) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      className={`rounded-xl overflow-hidden ${index === activeImage ? "ring-2 ring-[#284769]" : ""
                        }`}
                    >
                      <img
                        src={src}
                        className="w-full h-[120px] sm:h-[150px] object-cover"
                        alt={`View ${index + 1}`}
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>

                {/* Fade plus arrow sit over the clipped row so it reads as "there is more". */}
                <div
                  className={`pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pt-12 pb-2 bg-linear-to-t from-white to-transparent transition-opacity duration-300 ${showScrollHint ? "opacity-100" : "opacity-0"
                    }`}
                >
                  <button
                    type="button"
                    aria-label="See more photos"
                    onClick={() => {
                      const rail = railRef.current;
                      rail?.scrollBy({ top: rail.clientHeight * 0.8, behavior: "smooth" });
                    }}
                    className="pointer-events-auto flex items-center gap-1 rounded-full bg-white/90 shadow-md px-3 py-1.5 text-xs text-[#284769] hover:bg-white"
                  >
                    Scroll to see more
                    <ChevronDown size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Headline facts */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mt-6 gap-4">
            {/* Vacant land reports 0 beds/baths; omit rather than print "0 bd". */}
            <div className="text-gray-600 text-lg flex flex-wrap gap-4">
              <span>{listing.fullAddress}</span>
              {listing.sqft > 0 && <span>{listing.sqft.toLocaleString()} sqft</span>}
              {listing.beds > 0 && <span>{listing.beds} bd</span>}
              {listing.baths > 0 && <span>{listing.baths} ba</span>}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs px-3 py-1 rounded-lg bg-blue-50 text-[#284769]">
                {listing.isRental ? "For Rent" : "For Sale"}
              </span>
              <div className="text-2xl font-bold text-gray-900">
                {listing.priceLabel}
              </div>
            </div>
          </div>

          {/* A withheld address is a seller instruction, not missing data; saying so is
              clearer than silently showing only the city. */}
          {listing.addressWithheld && (
            <p className="mt-4 text-sm text-gray-500">
              The exact address of this property is not disclosed publicly. Contact us for details.
            </p>
          )}

          <div className="mt-10 lg:mx-24">
            {details.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                {details.map(([label, value]) => (
                  <div key={label} className="border rounded-xl px-4 py-3">
                    <div className="text-xs text-gray-500">{label}</div>
                    <div className="text-gray-800 font-medium">{value}</div>
                  </div>
                ))}
              </div>
            )}

            <h2 className="text-4xl font-bold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-600 leading-relaxed text-md whitespace-pre-line">
              {listing.description || "No description was provided for this listing."}
            </p>

            {/* IDX display rules require attribution to the listing brokerage. */}
            {listing.source === "mls" && listing.listing_office && (
              <p className="mt-6 text-xs text-gray-400">
                Listing courtesy of {listing.listing_office}
                {listing.list_agent_name && ` - ${listing.list_agent_name}`}.
                Information deemed reliable but not guaranteed.
              </p>
            )}

            <ContactAgent
              listingId={listing.id}
              propertyAddress={listing.fullAddress}
              propertyPrice={listing.priceLabel}
            />
          </div>

          {/* Omitted entirely rather than shown empty -- a heading over nothing reads as
              broken, not as "we checked and there's nothing". Only happens when this is
              the only active listing in the catalog. */}
          {moreListings.length > 0 && (
            <div className="mt-16 lg:mx-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900">More Listings</h2>
                <Link
                  to="/Properties"
                  className="text-sm font-medium text-[#284769] hover:underline"
                >
                  View all properties
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {moreListings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
}
