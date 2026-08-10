// Openverse is a free, keyless image search (Flickr, Wikimedia Commons, and
// other CC-licensed sources) with a daily-resetting rate limit instead of a
// one-time credit pool, so it can't "run out" the way a paid API key can.
// Note: appending a type word like "hotel" or "tourist place" to the query
// noticeably hurts match quality on Openverse — omit it, location is enough.
const REQUEST_SPACING_MS = 200;
const MAX_429_RETRIES = 4;
const MIN_FALLBACK_CANDIDATES = 5;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const searchOpenverseMulti = async (searchQuery, pageSize, attempt = 0) => {
  try {
    const response = await fetch(
      `https://api.openverse.org/v1/images/?q=${encodeURIComponent(searchQuery)}&page_size=${pageSize}`
    );

    if (response.status === 429) {
      if (attempt >= MAX_429_RETRIES) {
        console.error(`[images] Giving up on "${searchQuery}" after ${attempt} rate-limit retries`);
        return [];
      }
      console.warn(`[images] 429 for "${searchQuery}", retry ${attempt + 1}/${MAX_429_RETRIES}`);
      // Exponential backoff: 2s, 4s, 8s, 16s — generation already runs behind
      // a loading screen, so it's fine to trade latency for reliability here.
      await sleep(2000 * 2 ** attempt);
      return searchOpenverseMulti(searchQuery, pageSize, attempt + 1);
    }

    if (!response.ok) {
      throw new Error(`Openverse API returned ${response.status}`);
    }

    const data = await response.json();
    const urls = (data?.results || []).map((r) => r?.url || r?.thumbnail).filter(Boolean);
    console.log(`[images] "${searchQuery}" -> ${urls.length} result(s)`);
    return urls;
  } catch (err) {
    console.error(`[images] Error searching Openverse for "${searchQuery}":`, err);
    return [];
  }
};

const searchOpenverse = async (searchQuery) => {
  const [url] = await searchOpenverseMulti(searchQuery, 1);
  return url || "";
};

// buildFallbackQuery lets a category retry with a broader search when the
// exact name has no matches — real hotel photography is almost always
// commercial/copyrighted, so small hotels/hostels rarely have any CC-licensed
// photo at all under their own name, unlike landmarks which usually do. All
// items needing a fallback share the same broader query (e.g. "hotel Paris"),
// so we fetch several candidates ONCE and hand out a different one to each,
// instead of every item collapsing onto the identical top result.
const fetchImages = async (queries, location, buildFallbackQuery) => {
  const newImages = {};
  const needsFallback = [];

  for (const query of queries) {
    if (!query || typeof query !== "string") continue;

    const imageUrl = await searchOpenverse(`${query} ${location || ""}`.trim());
    await sleep(REQUEST_SPACING_MS);

    newImages[query] = imageUrl;
    if (!imageUrl) needsFallback.push(query);
  }

  if (needsFallback.length > 0 && buildFallbackQuery) {
    console.log(`[images] ${needsFallback.length} item(s) need a fallback search`);
    const fallbackCandidates = await searchOpenverseMulti(
      buildFallbackQuery(location),
      Math.max(needsFallback.length, MIN_FALLBACK_CANDIDATES)
    );
    await sleep(REQUEST_SPACING_MS);

    needsFallback.forEach((query, i) => {
      if (fallbackCandidates.length > 0) {
        newImages[query] = fallbackCandidates[i % fallbackCandidates.length];
      }
    });
  }

  return newImages;
};

export const fetchImagesForHotels = (hotelNames, location) =>
  fetchImages(hotelNames, location, (loc) => `hotel ${loc || ""}`.trim());

export const fetchImagesForPlaces = (places, location) =>
  fetchImages(places, location);
