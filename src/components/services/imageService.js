// services/imageService.js
import { createClient } from "pexels";

const client = createClient("GAQKxaIKW5wVenrDnADhaqHCi4Fx4F5LnVAB2rTqZ6bawVlAO5Hhg3aJ");

export const fetchImagesForHotels = async (hotels, location) => {
  const newImages = {};
  const errors = [];

  for (const hotel of hotels) {
    try {
      const response = await fetch("https://google.serper.dev/images", {
        method: "POST",
        headers: {
          "X-API-KEY": "d85a44f8bce30e1c1852c7e8fca338e5c718a87f",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: `${hotel.hotelName} hotel ${location || 'India'}`,
          gl: "in",
        }),
      });

      const result = await response.json();
      console.log(`Serper API Response for ${hotel.hotelName}:`, result);

      if (result.images && result.images.length > 0) {
        newImages[hotel.hotelName] = result.images[0].imageUrl;
      } else {
        newImages[hotel.hotelName] = "";
      }
    } catch (err) {
      console.error(`Error fetching image for ${hotel.hotelName}:`, err);
      newImages[hotel.hotelName] = "";
    }
  }

  return newImages;
};

export const fetchImagesForPlaces = async (places, location) => {
  const newImages = {};
  const errors = [];

  for (const place of places) {
    try {
      const response = await fetch("https://google.serper.dev/images", {
        method: "POST",
        headers: {
          "X-API-KEY": "d85a44f8bce30e1c1852c7e8fca338e5c718a87f",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: `${place} tourist place ${location || 'India'}`,
          gl: "in",
        }),
      });

      const result = await response.json();
      console.log(`Serper API Response for ${place}:`, result);

      if (result.images && result.images.length > 0) {
        newImages[place] = result.images[0].imageUrl;
      } else {
        newImages[place] = "";
      }
    } catch (err) {
      console.error(`Error fetching image for ${place}:`, err);
      newImages[place] = "";
    }
  }

  return newImages;
};

export const fetchSingleImage = async (query) => {
  try {
    const response = await fetch("https://google.serper.dev/images", {
      method: "POST",
      headers: {
        "X-API-KEY": "d85a44f8bce30e1c1852c7e8fca338e5c718a87f",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: query,
        gl: "in",
      }),
    });

    const result = await response.json();
    console.log(`Serper API Response for ${query}:`, result);

    if (result.images && result.images.length > 0) {
      return result.images[0].imageUrl;
    }
    return "";
  } catch (err) {
    console.error(`Error fetching image for ${query}:`, err);
    return "";
  }
};