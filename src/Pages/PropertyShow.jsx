import React from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import ContactAgent from "../Components/ContactAgent";

export default function PropertyShow() {
  const [searchParams] = useSearchParams();

  const image = searchParams.get("image");
  const image1 = searchParams.get("image1");
  const image2 = searchParams.get("image2");
  const image3 = searchParams.get("image3");
  const image4 = searchParams.get("image4");
  const price = searchParams.get("price");
  const per = searchParams.get("per");
  const address = searchParams.get("address");
  const sqft = searchParams.get("sqft");
  const beds = searchParams.get("beds");
  const baths = searchParams.get("baths");
  const tag = searchParams.get("tag");
  const tagColor = searchParams.get("tagColor");
  const description = searchParams.get("description");

  return (
    <>
      <Navbar />
      <section data-nav="light" className="min-h-screen bg-white mt-10">

        <div className="px-4 md:px-10 py-6 pt-24">

          {/* Top Bar */}
          <div className="flex justify-between items-center mb-6">

            <div className="text-sm text-gray-500">
              Home <span className="mx-2">-</span> Properties{" "}
              <span className="mx-2">-</span>{" "}
              <span className="text-gray-800 font-medium">
                Current Property
              </span>
            </div>

            <div className="flex items-center gap-3">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="agent"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  John Miller
                </p>
                <p className="text-xs text-gray-500">Agent</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <img
                src={image || "/images/house.jpg"}
                className="w-full h-[250px] sm:h-[350px] lg:h-[420px] object-cover rounded-2xl"
                alt="main"
              />
            </div> {/* Side Images */}
            <div className="grid grid-cols-2 gap-4">
              <img src={image1 || "/images/interior1.jpg"} className="w-full h-[120px] sm:h-[150px] object-cover rounded-xl" />
              <img src={image2 || "/images/interior2.jpg"} className="w-full h-[120px] sm:h-[150px] object-cover rounded-xl" />
              <img src={image3 || "/images/interior3.jpg"} className="w-full h-[120px] sm:h-[150px] object-cover rounded-xl" />
              <img src={image4 || "/images/interior4.jpg"} className="w-full h-[120px] sm:h-[150px] object-cover rounded-xl" />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mt-6 gap-4">
            <div className="text-gray-600 text-lg flex flex-wrap gap-4">
              <span>📍 {address}</span>
              <span>📐 {sqft}</span>
              <span>🛏 {beds}</span>
              <span>🛁 {baths}</span>
            </div>
            {/* TAG */}
            <div className="flex items-center gap-3">

              <span className={`text-xs font-medium px-3 py-1 rounded-lg ${tagColor}`}>
                {tag}
              </span>

              <div className="text-2xl font-bold text-gray-900">
                $ {price}
              </div>

            </div>
          </div>
          <div className="mt-10 mx-24">
            <h2 className="text-4xl font-bold text-gray-900 mb-4"> Description </h2>
            <p className="text-gray-600 leading-relaxed text-md">
              {description || `Based in Switzerland is a sleek and modern three-bed, two-bath getaway spread across 750 square feet of stylish comfort. Completed in 2025, it boasts contemporary architecture, room interiors, and premium finishes. The open living-dining layout sets the stage for relaxed hangouts or lively gatherings, while the generous windows flood the space with natural light, adding to its bright, airy feel.`}
            </p>

            <ContactAgent
              propertyAddress={address}
              propertyPrice={price}
              agentName="John Miller"
              agentEmail="delatorrejazzy36@gmail.com"
            />
          </div>

        </div>
      </section>
    </>
  );
}
