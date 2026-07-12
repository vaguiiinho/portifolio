import { fetchFromApi } from "@/lib/api-base-url"

export class ApiError extends Error {
  constructor(readonly status: number, message: string, readonly responseMessage = message) {
    super(message)
    this.name = "ApiError"
  }
  get isUnauthorized() { return this.status === 401 }
  get isForbidden() { return this.status === 403 }
  get isConflict() { return this.status === 409 }
  get isServerError() { return this.status >= 500 }
}

function isFormDataBody(body: unknown): body is FormData {
  return typeof FormData !== "undefined" && Boolean(body) && (body instanceof FormData || Object.prototype.toString.call(body) === "[object FormData]")
}

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = isFormDataBody(init?.body) ? init?.headers : { "Content-Type": "application/json", ...(init?.headers ?? {}) }
  const response = await fetchFromApi(path, { ...init, credentials: "include", cache: "no-store", headers })
  if (!response.ok) {
    const fallback = `Request failed with status ${response.status}`
    let message = fallback
    try { const body = await response.json(); message = body?.message || body?.error || fallback } catch {}
    const error = new ApiError(response.status, message)
    if (typeof window !== "undefined" && (error.isUnauthorized || error.isForbidden)) {
      window.dispatchEvent(new CustomEvent("portfolio:auth-error", { detail: { status: error.status, message } }))
    }
    throw error
  }
  return response.status === 204 ? undefined as T : response.json() as Promise<T>
}
