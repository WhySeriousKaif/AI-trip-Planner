const fetchImages = async (queries, type, location) => {
  const newImages = {};
  const errors = [];

  for (const query of queries) {
    try {
      const response = await fetch("https://google.serper.dev/images", {
        method: "POST",
        headers: {
          "X-API-KEY": "d85a44f8bce30e1c1852c7e8fca338e5c718a87f",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: `${query} ${type} ${location || "India"}`,
          gl: "in",
        }),
      });

      const result = await response.json();
      console.log(`Serper API Response for ${query}:`, result);

      if (result.images && result.images.length > 0) {
        newImages[query] = result.images[0].googleUrl || result.images[0].imageUrl;
      } else {
        newImages[query] = "";
      }
    } catch (err) {
      errors.push(`Error fetching image for ${query}: ${err.message}`);
      console.error("Error:", err);
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

export const fetchSingleImage = async (query, location) => {
  try {
    const response = await fetch("https://google.serper.dev/images", {
      method: "POST",
      headers: {
        "X-API-KEY": "d85a44f8bce30e1c1852c7e8fca338e5c718a87f",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: `${query} ${location || ""}`,
        gl: "in",
      }),
    });

    const result = await response.json();
    console.log(`Serper API Response for ${query}:`, result);

    if (result.images && result.images.length > 0) {
      return result.images[0].googleUrl || result.images[0].imageUrl;
    }
    return "";
  } catch (err) {
    console.error(`Error fetching image for ${query}:`, err);
    return "";
  }
};