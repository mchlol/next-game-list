export async function handleFetch(url) {
  try {
      const res = await fetch(url)
      const data = await res.json()
      return data;
  } catch (error) {
      console.error('Error fetching data: ',error);
      throw error;
  }
}

export default function handleRefresh(routerObj) {
  const uniqueKey = Date.now();
  window.location.href = `${routerObj.pathname}?key=${uniqueKey}`
};