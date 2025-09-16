// Central API utility for backend communication
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://agri-smart-c7vo.onrender.com/api";

// Get the auth token from localStorage
const getAuthToken = () => localStorage.getItem('auth_token');

// Add auth token to headers if it exists
const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json'
  };
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export async function apiGet(path) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: getHeaders()
  });
  if (!res.ok) {
    const error = new Error(`API error: ${res.status}`);
    error.status = res.status;
    throw error;
  }
  return res.json();
}

export async function apiPost(path, data) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = new Error(`API error: ${res.status}`);
    error.status = res.status;
    throw error;
  }
  return res.json();
}

export { API_BASE_URL };