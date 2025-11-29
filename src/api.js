const API_URL = "http://localhost:5000/api";

export async function apiGet(url, token) {
  const res = await fetch(API_URL + url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

export async function apiPost(url, body, token) {
  const res = await fetch(API_URL + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : ""
    },
    body: JSON.stringify(body)
  });
  return res.json();
}

export async function apiPut(url, body, token) {
  const res = await fetch(API_URL + url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });
  return res.json();
}

export async function apiDelete(url, token) {
  const res = await fetch(API_URL + url, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}
