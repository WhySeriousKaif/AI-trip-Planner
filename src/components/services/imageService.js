const SERPER_API_KEY = import.meta.env.VITE_SERPER_API_KEY;

const fetchImages = async (queries, type, location) => {
  const newImages = {};
  const errors = [];

  for (const query of queries) {
    if (!query || typeof query !== "string") continue;

    try {
      const response = await fetch("https://google.serper.dev/images", {
        method: "POST",
        headers: {
          "X-API-KEY": SERPER_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: `${query} ${type} ${location || "India"}`,
          gl: "in",
        }),
      });

      if (!response.ok) {
        throw new Error(`Serper API returned ${response.status}`);
      }

      const result = await response.json();

      // imageUrl is the actual hotlinkable image; googleUrl is a Google
      // image-viewer HTML page and is never valid as an <img src>.
      const firstImage = result.images?.[0];
      newImages[query] = firstImage?.imageUrl || firstImage?.thumbnailUrl || "";
    } catch (err) {
      errors.push(`Error fetching image for ${query}: ${err.message}`);
      newImages[query] = "";
    }
  }

  if (errors.length > 0) {
    console.error(errors.join("\n"));
  }

  return newImages;
};

export const fetchImagesForHotels = (hotelNames, location) =>
  fetchImages(hotelNames, "hotel", location);

export const fetchImagesForPlaces = (places, location) =>
  fetchImages(places, "tourist place", location);
