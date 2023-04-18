import fetch from "isomorphic-unfetch";

export async function sendRequest(
  url,
  method = "GET",
  data = null,
  token = null
) {
  const headers = {
    "Content-type": "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const config = {
    method: method,
    headers: headers,
  };
  if (data) {
    config.body = JSON.stringify(data);
  }
  const response = await fetch(url, config);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(response.statusText);
  }
}
