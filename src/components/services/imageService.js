// Openverse is a free, keyless image search (Flickr, Wikimedia Commons, and
// other CC-licensed sources) with a daily-resetting rate limit instead of a
// one-time credit pool, so it can't "run out" the way a paid API key can.
// Note: appending a type word like "hotel" or "tourist place" to the query
// noticeably hurts match quality on Openverse — omit it, location is enough.
const REQUEST_SPACING_MS = 200;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchImageForQuery = async (query, location, retryOn429 = true) => {
  try {
    const searchQuery = `${query} ${location || ""}`.trim();
    const response = await fetch(
      `https://api.openverse.org/v1/images/?q=${encodeURIComponent(searchQuery)}&page_size=1`
    );

    if (response.status === 429 && retryOn429) {
      await sleep(1500);
      return fetchImageForQuery(query, location, false);
    }

    if (!response.ok) {
      throw new Error(`Openverse API returned ${response.status}`);
    }

    const data = await response.json();
    const firstResult = data?.results?.[0];
    return firstResult?.url || firstResult?.thumbnail || "";
  } catch (err) {
    console.error(`Error fetching image for "${query}":`, err);
    return "";
  }
};

const fetchImages = async (queries, location) => {
  const newImages = {};

  for (const query of queries) {
    if (!query || typeof query !== "string") continue;
    newImages[query] = await fetchImageForQuery(query, location);
    await sleep(REQUEST_SPACING_MS);
  }

  return newImages;
};

export const fetchImagesForHotels = (hotelNames, location) =>
  fetchImages(hotelNames, location);

export const fetchImagesForPlaces = (places, location) =>
  fetchImages(places, location);
