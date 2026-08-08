// Reads the public_listings view over PostgREST.
//
// That view is the only listing surface the publishable key can reach. Its MLS rows come
// from the IDX subscription, which is licensed for public display; the Back Office feed
// that powers the CRM is a different token writing to a different table and must never
// appear here. Own (off-MLS) listings join the same view once flagged publish_to_website,
// so the page renders one mixed grid the way the CRM does.

const BASE_URL = import.meta.env.VITE_SUPABASE_URL;
const PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Naming the columns keeps the payload to what the public pages actually render, so a
// future column on the view cannot silently start shipping to the browser.
//
// Split into two sets on purpose. A single listing can carry a few hundred words of
// remarks and 44 photo URLs, and the grid, hero and city tiles render none of it -- only
// the detail page does. Asking for it on every list load made the whole feed 21KB instead
// of 2.8KB, which is what left the hero sitting on a placeholder.
const LIST_COLUMNS = [
  "id", "source", "listing_type", "title",
  "address", "address_display_allowed", "city", "state",
  "status", "list_price", "close_price", "beds", "baths", "sqft",
  "listing_office", "image_url",
].join(",");

const DETAIL_COLUMNS = [
  LIST_COLUMNS,
  "mls_number", "zip_code", "community_name", "acreage", "year_built", "garage",
  "sub_type", "pool", "waterfront", "hoa", "hoa_dues", "description",
  "days_on_market", "list_agent_name", "image_urls",
].join(",");

// Available before pending before sold, which is the alphabetical order of the status
// values, then most expensive first within each group.
const ORDER = "status.asc,list_price.desc";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

// A closed lease is "leased", not "sold"; a closed sale shows what it actually sold for.
export function formatPrice(listing) {
  const amount =
    listing.status === "sold" && listing.close_price != null
      ? listing.close_price
      : listing.list_price;

  if (amount == null) return "Price on request";
  return listing.listing_type === "rent" ? `${money.format(amount)}/mo` : money.format(amount);
}

export function statusLabel(listing) {
  if (listing.status !== "sold") return listing.status;
  return listing.listing_type === "rent" ? "leased" : "sold";
}

function normalize(row) {
  const images = row.image_urls?.length
    ? row.image_urls
    : row.image_url
      ? [row.image_url]
      : [];

  // When a seller opts out of internet address display the sync never stored the street
  // address at all, and the view's title falls back to subdivision or city. Reading title
  // here means there is no path that prints a withheld address.
  const headline = row.address_display_allowed && row.address ? row.address : row.title;
  const locality = [row.city, row.state].filter(Boolean).join(", ");

  // A withheld address leaves the headline equal to the city, which would otherwise
  // render as "CLERMONT, CLERMONT, FL".
  const redundant = headline?.toLowerCase() === row.city?.toLowerCase();

  return {
    ...row,
    images,
    displayAddress: headline,
    fullAddress: redundant || !headline ? locality : `${headline}, ${locality}`,
    addressWithheld: !row.address_display_allowed,
    location: locality,
    isRental: row.listing_type === "rent",
    priceLabel: formatPrice(row),
    statusText: statusLabel(row),
  };
}

async function request(path) {
  if (!BASE_URL || !PUBLISHABLE_KEY) {
    throw new Error(
      "Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY — copy .env.example to .env",
    );
  }

  const res = await fetch(`${BASE_URL}/rest/v1/${path}`, {
    headers: { apikey: PUBLISHABLE_KEY, Accept: "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Listings request failed (${res.status})`);
  }
  return res.json();
}

export async function fetchListings() {
  const rows = await request(`public_listings?select=${LIST_COLUMNS}&order=${ORDER}`);
  return rows.map(normalize);
}

export async function fetchListingById(id) {
  const rows = await request(
    `public_listings?select=${DETAIL_COLUMNS}&id=eq.${encodeURIComponent(id)}&limit=1`,
  );
  return rows.length ? normalize(rows[0]) : null;
}
