import React, { useEffect, useRef, useState } from "react";
import ralphImage from "../../public/images/ralph.png"
import jahkaiImage from "../../public/images/jakhai.jpeg"

const CALENDLY_SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

const CONSULTANTS = [
    {
        id: "ralph",
        name: "Ralph",
        role: "Real Estate Consultant",
        avatar: ralphImage,
        // Each consultant's own Calendly account/event — she's the native
        // host of whatever gets booked here, so no guest-field workaround
        // is needed to get her onto the meeting.
        calendlyUrl: "https://calendly.com/ralph-mack1realtygroup/30min",
    },
    {
        id: "jahkai",
        name: "Jahkai",
        role: "Real Estate Consultant",
        avatar: jahkaiImage,
        calendlyUrl: "https://calendly.com/ralph-mack1realtygroup/30min",
    },
];

export default function ConsultationPage() {
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [calendlyReady, setCalendlyReady] = useState(false);
    const widgetRef = useRef(null);

    useEffect(() => {
        const existing = document.querySelector(
            `script[src="${CALENDLY_SCRIPT_SRC}"]`
        );

        if (existing) {
            if (window.Calendly) setCalendlyReady(true);
            else existing.addEventListener("load", () => setCalendlyReady(true));
            return;
        }

        const script = document.createElement("script");
        script.src = CALENDLY_SCRIPT_SRC;
        script.async = true;
        script.onload = () => setCalendlyReady(true);
        document.body.appendChild(script);
    }, []);

    const selected = CONSULTANTS.find((person) => person.id === selectedPerson);

    // Calendly's widget.js only auto-scans the page once on load, so the
    // widget must be initialized manually whenever the container appears
    // (it isn't in the DOM yet at that initial scan since it only renders
    // after a consultant is selected). Re-runs whenever the visitor picks a
    // different consultant, swapping in that consultant's own Calendly URL.
    useEffect(() => {
        if (!selected || !calendlyReady || !widgetRef.current) return;

        widgetRef.current.innerHTML = "";

        window.Calendly.initInlineWidget({
            url: selected.calendlyUrl,
            parentElement: widgetRef.current,
        });
    }, [selected, calendlyReady]);

    return (
        <div className="max-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-6xl bg-white max-h-screen rounded-2xl shadow-lg grid md:grid-cols-2 overflow-hidden">

                {/* LEFT — INFO + CONSULTANT PICKER */}
                <div className="p-10 border-r">
                    <h1 className="text-3xl font-bold">
                        Free Initial Consultation Program
                    </h1>

                    <div className="flex items-center gap-2 mt-6 text-gray-700 font-medium">
                        <span>🕒</span>
                        <span className="text-sm font-semibold">30 min</span>
                    </div>

                    <div className="flex items-start gap-2 mt-4 text-gray-700">
                        <span>📹</span>
                        <p className="text-sm font-medium">
                            Web conferencing details provided upon confirmation.
                        </p>
                    </div>

                    <p className="text-gray-700 mt-6 leading-relaxed text-sm">
                        <span className="font-semibold">
                            Your consultation with our team
                        </span>{" "}
                        is designed to understand your property goals and guide you
                        through the{" "}
                        <span className="font-semibold">
                            buying, selling, or investment process
                        </span>{" "}
                        with confidence.
                    </p>

                    <div className="mt-10">
                        <h2 className="text-lg font-bold text-gray-900 mb-1">
                            Choose Your Consultant
                        </h2>
                        <p className="text-sm text-gray-500 mb-4">
                            Select who you'd like to meet with.
                        </p>

                        <div className="flex flex-col gap-3">
                            {CONSULTANTS.map((person) => {
                                const isSelected = person.id === selectedPerson;

                                return (
                                    <button
                                        key={person.id}
                                        onClick={() => setSelectedPerson(person.id)}
                                        className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition
                                            ${isSelected
                                                ? "border-blue-600 bg-blue-50"
                                                : "border-gray-200 bg-white hover:border-blue-300"
                                            }`}
                                    >
                                        <img
                                            src={person.avatar}
                                            alt={person.name}
                                            className="w-20 h-26 object-cover"
                                        />
                                        <div>
                                            <p className="font-semibold text-gray-900">
                                                {person.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {person.role}
                                            </p>
                                        </div>
                                        {isSelected && (
                                            <span className="ml-auto text-blue-600 text-sm font-semibold">
                                                Selected ✓
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* RIGHT — CALENDAR */}
                <div className="p-10 flex flex-col">
                    {selected ? (
                        <>
                            <p className="text-sm text-gray-600 mb-4">
                                You're scheduling a consultation with{" "}
                                <span className="font-semibold text-gray-900">
                                    {selected.name}
                                </span>
                                .
                            </p>
                            <div
                                ref={widgetRef}
                                className="flex-1"
                                style={{ minWidth: "320px", height: "900px" }}
                            ></div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-center text-gray-400 text-sm min-h-[400px]">
                            Select a consultant on the left to view their
                            availability.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
