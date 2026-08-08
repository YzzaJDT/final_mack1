// Sends the property page's "get in touch" form into the CRM's leads table.
//
// The publishable key cannot write to leads directly -- the only thing it may call is the
// submit_website_lead function, which fixes the status, leaves the lead unassigned for
// admin triage, and decides for itself whether the listing id maps to a CRM property.

const BASE_URL = import.meta.env.VITE_SUPABASE_URL;
const PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// A lead row carries one free-text `message`, so the fields with no column of their own
// (the spare contact number, the visitor's own address) are folded in below what the
// visitor actually wrote. Their words go first because the CRM's leads table clamps this
// column to one line, and that line should be the enquiry, not the boilerplate.
export function buildLeadMessage({ message, altNumber, address, propertyAddress, propertyPrice }) {
  const property = [propertyAddress, propertyPrice].filter(Boolean).join(" - ");

  const context = [
    property && `Enquiring about: ${property}`,
    altNumber && `Alternate contact number: ${altNumber}`,
    address && `Their address: ${address}`,
    "Submitted from the website property page.",
  ]
    .filter(Boolean)
    .join("\n");

  return message ? `${message}\n\n--\n${context}` : context;
}

export async function submitLead({ name, email, phone, message, listingId, propertyInterest }) {
  if (!BASE_URL || !PUBLISHABLE_KEY) {
    throw new Error(
      "Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY — copy .env.example to .env",
    );
  }

  const res = await fetch(`${BASE_URL}/rest/v1/rpc/submit_website_lead`, {
    method: "POST",
    headers: { apikey: PUBLISHABLE_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({
      p_name: name,
      p_email: email,
      p_phone: phone || null,
      p_message: message || null,
      p_listing_id: listingId || null,
      p_property_interest: propertyInterest || null,
    }),
  });

  if (!res.ok) {
    throw new Error(`Lead submission failed (${res.status})`);
  }
}
