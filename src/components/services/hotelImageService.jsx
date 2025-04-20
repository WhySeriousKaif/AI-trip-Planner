// hotelImageService.jsx
import { createClient } from "pexels";

const client = createClient("GAQKxaIKW5wVenrDnADhaqHCi4Fx4F5LnVAB2rTqZ6bawVlAO5Hhg3aJ");

export const fetchHotelImages = async (hotelNames = []) => {
  const hotelImages = {};

  for (const hotel of hotelNames) {
    if (!hotel || typeof hotel !== "string") continue;

    try {
      const res = await client.photos.search({ query: hotel, per_page: 1 });

      if (res && Array.isArray(res.photos) && res.photos.length > 0) {
        hotelImages[hotel] = res.photos[0].src.large;
      } else {
        hotelImages[hotel] = ""; // fallback empty string if not found
      }
    } catch (err) {
      console.error(`Error fetching hotel image for "${hotel}":`, err);
      hotelImages[hotel] = ""; // fallback if error
    }
  }

  return hotelImages;
};