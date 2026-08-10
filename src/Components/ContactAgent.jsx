import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { buildLeadMessage, submitLead } from "../lib/leads";

// meet.new always creates a brand-new instant Google Meet when opened —
// the agent clicks it to start a meeting, then shares that meeting's URL with the client.
const GOOGLE_MEET_LINK = "https://meet.new";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const DEFAULT_AGENT_EMAIL = import.meta.env.VITE_AGENT_EMAIL || "delatorrejazzy36@gmail.com";

// Announces the enquiry to the agent's inbox. Best-effort by design: the lead is already
// saved in the CRM by the time this runs, so a missing key or a bad send must not read as
// a failed enquiry to the visitor.
async function announceByEmail(fields) {
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) return;

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, fields, {
      publicKey: EMAILJS_PUBLIC_KEY,
    });
  } catch {
    // Swallowed on purpose; the CRM lead is the record that matters.
  }
}

export default function ContactAgent({ listingId, propertyAddress, propertyPrice, agentName, agentEmail }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contactNumber: "",
    phone: "",
    address: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    // The form asks for two numbers but a lead row keeps one, so the spare rides along in
    // the message instead of being dropped.
    const contactNumber = form.contactNumber.trim();
    const phone = form.phone.trim() || contactNumber;
    const altNumber = contactNumber === phone ? "" : contactNumber;

    // The CRM lead is the record that matters, so it is written first and is the only
    // thing that can fail the submission.
    try {
      await submitLead({
        name: form.name,
        email: form.email,
        phone,
        message: buildLeadMessage({
          message: form.message.trim(),
          altNumber,
          address: form.address.trim(),
          propertyAddress,
          propertyPrice,
        }),
        listingId,
        propertyInterest: propertyAddress,
      });
    } catch {
      setStatus("error");
      return;
    }

    await announceByEmail({
      to_email: agentEmail || DEFAULT_AGENT_EMAIL,
      agent_name: agentName || "there",
      client_name: form.name,
      client_email: form.email,
      client_phone: form.phone,
      client_contact_number: form.contactNumber,
      client_address: form.address,
      client_message: form.message,
      property_address: propertyAddress || "",
      property_price: propertyPrice || "",
      meet_link: GOOGLE_MEET_LINK,
    });

    setStatus("sent");
    setForm({ name: "", email: "", contactNumber: "", phone: "", address: "", message: "" });
  };

  return (
    <section className="bg-white py-16">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-semibold mb-8">
        Tell us how to get in touch with you
      </h2>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-gray-100 rounded-2xl p-6 md:p-8 max-w-full">

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Full Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Full Name <span className="text-red-600">*</span></label>
            <input type="text" placeholder="Name" required value={form.name} onChange={handleChange("name")} className="w-full bg-white rounded-lg px-4 py-3 text-sm outline-none border border-gray-200 focus:ring-2 focus:ring-orange-400" />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Email Address <span className="text-red-600">*</span></label>
            <input type="email" placeholder="Email Address" required value={form.email} onChange={handleChange("email")} className="w-full bg-white rounded-lg px-4 py-3 text-sm outline-none border border-gray-200 focus:ring-2 focus:ring-orange-400" />
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Contact Number</label>
            <input type="text" placeholder="Contact Number" value={form.contactNumber} onChange={handleChange("contactNumber")} className="w-full bg-white rounded-lg px-4 py-3 text-sm outline-none border border-gray-200 focus:ring-2 focus:ring-orange-400" />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Phone No</label>
            <input type="text" placeholder="Phone No" value={form.phone} onChange={handleChange("phone")} className="w-full bg-white rounded-lg px-4 py-3 text-sm outline-none border border-gray-200 focus:ring-2 focus:ring-orange-400" />
          </div>

          {/* Full Address - FULL WIDTH */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 mb-2">Full Address</label>
            <input type="text" placeholder="Full Address" value={form.address} onChange={handleChange("address")} className="w-full bg-white rounded-lg px-4 py-3 text-sm outline-none border border-gray-200 focus:ring-2 focus:ring-orange-400" />
          </div>

          {/* Message - FULL WIDTH */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 mb-2">Message <span className="text-red-600">*</span></label>
            <textarea rows={4} placeholder="Tell us what you would like to know about this property" required value={form.message} onChange={handleChange("message")} className="w-full bg-white rounded-lg px-4 py-3 text-sm outline-none border border-gray-200 focus:ring-2 focus:ring-orange-400 resize-y" />
          </div>

        </div>

        {/* Status message */}
        {status === "sent" && (
          <p className="mt-4 text-sm text-green-600">Thanks — your details are with our team, and an agent will be in touch shortly.</p>
        )}
        {status === "error" && (
          <p className="mt-4 text-sm text-red-600">Something went wrong saving your details. Please try again.</p>
        )}

        {/* Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={status === "sending"}
            className="px-6 py-3 rounded-xl font-semibold text-white bg-linear-to-r from-[#345578] to-[#284769] shadow-lg hover:scale-105 transition-transform duration-300 disabled:opacity-60 disabled:hover:scale-100"
          >
            {status === "sending" ? "Sending..." : "Submit"}
          </button>
        </div>

      </form>
    </section>
  );
}
