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

// Listings now carry a real city from the MLS feed, so nothing is assigned any more.
// MLS supplies it upper-cased ("ORLANDO") while these tiles are title-cased, hence the
// case-insensitive compare.
export function matchesCity(listing, cityName) {
  return listing?.city?.toLowerCase() === cityName?.toLowerCase();
}
