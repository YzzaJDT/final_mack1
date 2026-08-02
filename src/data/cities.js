// Real landmark photos (Wikimedia Commons, public domain / CC-licensed)
// instead of the old source.unsplash.com links, a redirect service that's
// been discontinued and no longer resolves to real images.
const commonsFile = (filename) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${filename}?width=800`;

export const CITIES = [
  { name: "Jacksonville", image: commonsFile("Friendship_Fountain_at_Night.JPG") }, // Friendship Fountain
  { name: "Miami", image: commonsFile("Miami_Skyline_2020.jpg") }, // Miami skyline
  { name: "Orlando", image: commonsFile("OrlandoNightSkyline.jpg") }, // Orlando skyline
  { name: "Tampa", image: commonsFile("Tampa_Riverwalk_01.jpg") }, // Tampa Riverwalk
  { name: "Tallahassee", image: commonsFile("Florida_State_Capitol_and_Florida_House_Office.JPG") }, // Florida State Capitol
  { name: "St. Petersburg", image: commonsFile("SaintPetersburgFloridaPier.JPG") }, // St. Pete Pier
  { name: "Hialeah", image: commonsFile("Hialeah_Park_Race_Track.jpg") }, // Hialeah Park Race Track
  { name: "Fort Lauderdale", image: commonsFile("Las_Olas_Boulevard,_Fort_Lauderdale,_Florida_09.jpg") }, // Las Olas Boulevard
];

// The listings API has no real city/landmark field on each property, so each
// property is deterministically assigned one of the CITIES above (stable
// across renders/pages since it's derived from the property's own id).
export function getPropertyCity(property) {
  const id = parseInt(property?.id, 10) || 0;
  return CITIES[id % CITIES.length].name;
}
