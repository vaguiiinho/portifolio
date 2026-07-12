import { request } from "./client"
import type { AuthUser, LoginPayload, LoginResponse } from "./types"
export const login = (payload: LoginPayload) => request<LoginResponse>("/auth/login", { method: "POST", body: JSON.stringify(payload) })
export const fetchCurrentUser = () => request<AuthUser & { sub?: string }>("/auth/me")
export const logout = () => request<void>("/auth/logout", { method: "POST" })
