import { sendRequest } from "./send-request";

const BASE_URL = "http://localhost:3001/users";

export async function signUp(userData) {
  console.log("userData", userData);
  const token = await sendRequest(BASE_URL, "POST", userData);
  window.localStorage.setItem("token", token);
  return getUser();
}

export async function login(credentials) {
  const token = await sendRequest(`${BASE_URL}/login`, "POST", credentials);
  window.localStorage.setItem("token", token);
  return getUser();
}

export function getToken() {
  const token = window.localStorage.getItem("token");

  if (!token) return null;
  const payload = JSON.parse(atob(token.split(".")[1]));
  if (payload.exp < Date.now() / 1000) {
    window.localStorage.removeItem("token");
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}

export function logOut() {
  window.localStorage.removeItem("token");
}

export function changeDetails() {
  console.log("Feature still under construction.");
}
