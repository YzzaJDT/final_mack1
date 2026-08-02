import React, { useEffect, useState } from "react";
import FilterTabs from "../Components/FilterTabs";

export default function PropertyCards() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch("https://6a24ec645447714a6f830bdb.mockapi.io/listing/realstate")
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((err) => console.log(err));
  }, []);

  // ✅ FORCE EXACTLY 3 ITEMS ONLY
  const limitedData = properties
    .filter((item) => item.type === "For Sale")
    .slice(0, 2)
    .concat(
      properties.filter((item) => item.type === "For Rent").slice(0, 1)
    );

  return (
    <div className="min-h-screen bg-gray-100 px-6 md:px-16">
      <FilterTabs properties={limitedData} />
    </div>
  );
}
