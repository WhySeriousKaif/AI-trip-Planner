import React, { useState, useEffect } from "react";

const PlaceImageSearch = ({ places }) => {
  const [images, setImages] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      const newImages = {};
      for (const place of places) {
        try {
          const requestOptions = {
            method: "GET",
            redirect: "follow",
            headers: {
              "X-API-KEY": "d85a44f8bce30e1c1852c7e8fca338e5c718a87f", // your Serper API key
              "Content-Type": "application/json",
            },
          };

          const response = await fetch(
            `https://google.serper.dev/search?q=${encodeURIComponent(place)}&gl=in`,
            requestOptions
          );
          const result = await response.json();

          console.log(`API Response for ${place}:`, result);

          const imagesList = result.images || [];
          if (imagesList.length > 0) {
            newImages[place] = imagesList[0].imageUrl; // Use the first image URL
          } else {
            newImages[place] = ""; // No image found
          }
        } catch (err) {
          setError(`Error fetching data for ${place}.`);
          console.error("Error:", err);
        }
      }
      setImages(newImages);
    };

    fetchImages();
  }, [places]);

  return (
    <div>
      <h1>Place Images</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {places.map((place) => (
          <div key={place} className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-lg">{place}</h3>
            {images[place] ? (
              <img src={images[place]} alt={place} style={{ width: "300px" }} />
            ) : (
              <p>No image found.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaceImageSearch;