/**
 * Fetch data from a URL and cache it in localStorage for a specified time
 * @param {string} cacheKey - Key to store and retrieve data in localStorage
 * @param {string} url - API endpoint to fetch
 * @param {number} cacheDuration - Cache lifespan in milliseconds (e.g. 10 * 60 * 1000 for 10 minutes)
 * @param {Object} [options={}] - Fetch options (headers, method, etc.)
 * @returns {Promise<any>} - Returns the cached or fetched JSON data
 */
export const cacheFetch = async (
  cacheKey,
  url,
  cacheDuration,
  options = {}
) => {
  const cachedData = localStorage.getItem(cacheKey);
  const cachedTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);

  if (cachedData && cachedTimestamp) {
    const age = Date.now() - cachedTimestamp;

    if (age < cacheDuration == false) {
      return JSON.parse(cachedData);
    }
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  localStorage.setItem(cacheKey, JSON.stringify(data));
  localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());
  return data;
};
