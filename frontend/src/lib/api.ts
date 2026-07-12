export * from "./api/types"
export { ApiError } from "./api/client"
export * from "./api/auth"
export * from "./api/projects"
export * from "./api/config"
export * from "./api/stats"
export * from "./api/contact"

import { getApiBaseUrl } from "./api-base-url"

export function resolveMediaUrl(value?: string | null) {
  if (!value || value.startsWith("http://") || value.startsWith("https://") || value.startsWith("data:")) return value ?? undefined
  return value.startsWith("/uploads/") ? `${getApiBaseUrl()}${value}` : value
}
