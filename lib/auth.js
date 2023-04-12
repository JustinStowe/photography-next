import { login, newSignUp } from "./post";

export async function signIn(email, password) {
  const response = await login("/api/user/login", { email, password });
  return response;
}

export async function signUp(email, password) {
  const response = await newSignUp("/api/user/signUp", { email, password });
  return response;
}
