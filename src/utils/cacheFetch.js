// /**
//  * Fetch data from a URL and cache it in localStorage for a specified time
//  * @param {string} cacheKey - Key to store and retrieve data in localStorage
//  * @param {string} url - API endpoint to fetch
//  * @param {number} cacheDuration - Cache lifespan in milliseconds (e.g. 10 * 60 * 1000 for 10 minutes)
//  * @param {Object} [options={}] - Fetch options (headers, method, etc.)
//  * @returns {Promise<any>} - Returns the cached or fetched JSON data
//  */
// export const cacheFetch = async (
//   cacheKey,
//   url,
//   cacheDuration,
//   options = {}
// ) => {
//   const cachedData = localStorage.getItem(cacheKey);
//   const cachedTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);

//   if (cachedData && cachedTimestamp) {
//     const age = Date.now() - Number(cachedTimestamp);

//     // If cache is still valid → return it
//     if (age < cacheDuration) {
//       return JSON.parse(cachedData);
//     }
//   }

//   // Cache expired → fetch new data
//   const response = await fetch(url, options);
//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }

//   const data = await response.json();

//   // Store updated cache
//   localStorage.setItem(cacheKey, JSON.stringify(data));
//   localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());

//   return data;
// };

/**
 * Fetch data from your caching backend
 * @param {string} endpoint - API endpoint to fetch (e.g. "anime/upcoming")
 * @param {Object} [options={}] - Optional fetch options (headers, method, etc.)
 * @param {boolean} [isHome=false] - If true, use the home API via backend query ?home=true
 * @returns {Promise<any>} - Returns JSON data
 */
export const cacheFetch = async (endpoint, options = {}, isHome = false) => {
  try {
    // Construct backend URL
    const url = new URL(
      `https://redis-server-production-9330.up.railway.app/${endpoint}`
    );

    if (isHome) {
      url.searchParams.append("home", "true");
    }

    const response = await fetch(url.toString(), options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("cacheFetch error:", err.message);
    throw err;
  }
};
