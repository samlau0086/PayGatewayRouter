export async function apiFetch(endpoint: string, options: any = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  
  const res = await fetch(`/api${endpoint}`, { ...options, headers });
  if (!res.ok) {
     const text = await res.text();
     let message = text;
     try {
       const json = JSON.parse(text);
       message = json.error || json.message || text;
     } catch (e) {
       // fallback to raw text
     }
     throw new Error(message);
  }
  return res.json();
}
