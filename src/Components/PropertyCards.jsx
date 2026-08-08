import React from "react";
import FilterTabs from "../Components/FilterTabs";

// Home-page teaser: the same grid the Properties page uses, capped to three cards.
// FilterTabs owns the fetching, so there is only one place that talks to the listings API.
export default function PropertyCards() {
  return (
    <div className="min-h-screen bg-gray-100 px-6 md:px-16">
      <FilterTabs limit={3} />
    </div>
  );
}
