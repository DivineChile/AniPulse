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
