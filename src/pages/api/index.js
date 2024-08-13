export async function handleFetch(url) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
    }
  }
  try {
      const res = await fetch(url, options);
      if (!res.ok) {
        throw new Error(`HTTP error - status: ${res.status}, ${res.statusText}`);
      }
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