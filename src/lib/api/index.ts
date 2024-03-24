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

function logout(options?: RequestOptions): Promise<unknown> {
  return apiRequest("/logout", { method: "POST", ...options });
}

interface Chat {
  id: number;
  name: string;
  avatarUrl: string;
  timestamp: string;
}

function getChats(options?: RequestOptions): Promise<Chat[]> {
  return apiRequest("/chats", { method: "GET", ...options });
}

export interface ChatMessage {
  id: number;
  content: string;
  from: "me" | "them";
  timestamp: string;
}

function getChatMessages(
  recipientId: string | number,
  options?: RequestOptions,
): Promise<ChatMessage[]> {
  return apiRequest(`/chats/${recipientId}/messages`, {
    method: "GET",
    ...options,
  });
}

function sendChatMessage(
  recipientId: string | number,
  options: RequestOptionsBodyRequired,
): Promise<unknown> {
  return apiRequest(`/chats/${recipientId}/messages`, {
    method: "POST",
    ...options,
  });
}

export const tuconApi = {
  register,
  login,
  logout,
  me,
  getChats,
  getChatMessages,
  sendChatMessage,
};
