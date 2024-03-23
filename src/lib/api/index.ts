import {
  RequestOptions,
  RequestOptionsBodyRequired,
  apiRequest,
} from "./utils";

function register(options: RequestOptionsBodyRequired): Promise<unknown> {
  return apiRequest("/register", { method: "POST", ...options });
}

function login(options: RequestOptionsBodyRequired): Promise<unknown> {
  return apiRequest("/login", { method: "POST", ...options });
}

interface MeResponseLoggedOut {
  userId: null;
  firstName: undefined;
  lastName: undefined;
  lastView: undefined;
}

interface MeResponseLoggedIn {
  userId: number;
  firstName: string;
  lastName: string;
  lastView: string;
}

function me(
  options?: RequestOptions,
): Promise<MeResponseLoggedIn | MeResponseLoggedOut> {
  return apiRequest("/me", { method: "GET", ...options });
}

function logout(): Promise<unknown> {
  return apiRequest("/logout", { method: "POST" });
}

export const tuconApi = {
  register,
  login,
  logout,
  me,
};
