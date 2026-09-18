import apiClient from "@/lib/apiClient";
import { RegistrationPayload } from "@/types";

export const userLogin = (payload: { email: string; password: string }) => {
  return apiClient("/auth/login", {
    method: "POST",
    body: payload,
  });
};

export const userRegistration = (payload: RegistrationPayload) => {
  return apiClient("/auth/register", {
    method: "POST",
    body: payload,
  });
};

export const userLogout = () => {
  return apiClient("/auth/logout", {
    method: "POST",
  });
};

export const getMe = () => {
  return apiClient("/auth/me");
};

export const googleOAuth = (payload: { idToken: string }) => {
  return apiClient("/auth/google", { method: "POST", body: payload });
};
