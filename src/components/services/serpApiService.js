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
          q: `${place} ${location || 'India'} tourist place`,
          gl: "in",
        }),
      });

      const result = await response.json();
      console.log(`Serper API Response for ${place}:`, result);

      if (result.images && result.images.length > 0) {
        newImages[place] = result.images[0].googleUrl;
        console.log("newImages", newImages);
      } else {
        newImages[place] = "";
        console.log("didn't find image");
      }
    } catch (err) {
      errors.push(`Error fetching image for ${place}: ${err.message}`);
      console.error("Error:", err);
      newImages[place] = "";
    }
  }

  if (errors.length > 0) {
    console.error(errors.join("\n"));
  }

  return newImages;
};

export const fetchImagesForHotels = async (hotels, location) => {
  const hotelImages = {};
  const errors = [];

  for (const hotel of hotels) {
    try {
      const response = await fetch("https://google.serper.dev/images", {
        method: "POST",
        headers: {
          "X-API-KEY": "YOUR_SERPAPI_KEY", // Replace with your actual API key
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: `${hotel} ${location || 'India'} hotel`,
          gl: "in",
        }),
      });

      const result = await response.json();
      console.log(`Serper API Response for ${hotel}:`, result);

      if (result.images && result.images.length > 0) {
        hotelImages[hotel] = result.images[0].googleUrl;
        console.log("hotelImages", hotelImages);
      } else {
        hotelImages[hotel] = "";
        console.log("didn't find image");
      }
    } catch (err) {
      errors.push(`Error fetching image for ${hotel}: ${err.message}`);
      console.error("Error:", err);
      hotelImages[hotel] = "";
    }
  }

  if (errors.length > 0) {
    console.error(errors.join("\n"));
  }

  return hotelImages;
};
