import { request } from "./client"
import type { ApiConfig, ConfigPayload } from "./types"
export const updateConfig = (payload: ConfigPayload) => request<ApiConfig>("/config", { method: "PUT", body: JSON.stringify(payload) })
