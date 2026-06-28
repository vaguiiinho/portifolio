import { fetchFromApi, getApiBaseUrl } from './api-base-url'

export interface ApiProject {
  id: string
  title: string
  description: string
  techStack: string[]
  githubUrl?: string | null
  liveUrl?: string | null
  videoUrl?: string | null
  problemTitle?: string | null
  problemDescription?: string | null
  solutionTitle?: string | null
  solutionDescription?: string | null
  resultTitle?: string | null
  resultDescription?: string | null
  createdAt: string
  updatedAt: string
}

export interface AuthUser {
  id: string
  email: string
  role: 'visitante' | 'administrador'
}

export interface AuthSession {
  accessToken: string
  user: AuthUser
}

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  user: AuthUser
}

export interface ProjectPayload {
  title: string
  description: string
  techStack: string[]
  githubUrl?: string
  liveUrl?: string
  videoUrl?: string
  problemTitle?: string
  problemDescription?: string
  solutionTitle?: string
  solutionDescription?: string
  resultTitle?: string
  resultDescription?: string
}

export interface ApiStats {
  id: string
  projectsCount: number
  visitors: number
  events: Record<string, number>
  updatedAt: string
}

export interface ContactPayload {
  name: string
  email: string
  message: string
}

export class ApiError extends Error {
  readonly status: number
  readonly responseMessage: string

  constructor(status: number, message: string, responseMessage?: string) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.responseMessage = responseMessage ?? message
  }

  get isUnauthorized() {
    return this.status === 401
  }

  get isForbidden() {
    return this.status === 403
  }
}

const AUTH_SESSION_KEY = 'portfolio-auth-session'

function isBrowser() {
  return typeof window !== 'undefined'
}

export function readAuthSession(): AuthSession | null {
  if (!isBrowser()) {
    return null
  }

  const stored = window.localStorage.getItem(AUTH_SESSION_KEY)

  if (!stored) {
    return null
  }

  try {
    return JSON.parse(stored) as AuthSession
  } catch {
    window.localStorage.removeItem(AUTH_SESSION_KEY)
    return null
  }
}

export function writeAuthSession(session: AuthSession | null) {
  if (!isBrowser()) {
    return
  }

  if (!session) {
    window.localStorage.removeItem(AUTH_SESSION_KEY)
    return
  }

  window.localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session))
}

export function getStoredAuthToken() {
  return readAuthSession()?.accessToken
}

function withAuthHeaders(headers?: HeadersInit) {
  const mergedHeaders = new Headers(headers)
  const token = getStoredAuthToken()

  if (token && !mergedHeaders.has('Authorization')) {
    mergedHeaders.set('Authorization', `Bearer ${token}`)
  }

  return mergedHeaders
}

function isAuthError(status: number) {
  return status === 401 || status === 403
}

function isFormDataBody(body: unknown): body is FormData {
  if (typeof FormData === 'undefined' || !body) {
    return false
  }

  return body instanceof FormData || Object.prototype.toString.call(body) === '[object FormData]'
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const isFormData = isFormDataBody(init?.body)
  const headers = isFormData
    ? withAuthHeaders(init?.headers)
    : withAuthHeaders({
        'Content-Type': 'application/json',
        ...(init?.headers ?? {}),
      })

  const response = await fetchFromApi(path, {
    ...init,
    cache: 'no-store',
    headers,
  })

  if (!response.ok) {
    const fallbackMessage = `Request failed with status ${response.status}`
    let message = fallbackMessage

    try {
      const body = await response.json()
      message = body?.message || body?.error || fallbackMessage
    } catch {}

    if (isAuthError(response.status)) {
      const error = new ApiError(response.status, message, message)

      if (isBrowser()) {
        window.dispatchEvent(
          new CustomEvent("portfolio:auth-error", {
            detail: {
              status: response.status,
              message,
            },
          }),
        )
      }

      throw error
    }

    throw new ApiError(response.status, message)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

export async function fetchProjects() {
  return request<ApiProject[]>('/projects')
}

export async function createProject(payload: ProjectPayload | FormData) {
  return request<ApiProject>('/projects', {
    method: 'POST',
    body: payload instanceof FormData ? payload : JSON.stringify(payload),
  })
}

export async function updateProject(id: string, payload: ProjectPayload | FormData) {
  return request<ApiProject>(`/projects/${id}`, {
    method: 'PUT',
    body: payload instanceof FormData ? payload : JSON.stringify(payload),
  })
}

export async function deleteProject(id: string) {
  return request<void>(`/projects/${id}`, {
    method: 'DELETE',
  })
}

export async function fetchStats() {
  return request<ApiStats>('/stats')
}

export async function sendContact(payload: ContactPayload) {
  return request('/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function login(payload: LoginPayload) {
  return request<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function fetchCurrentUser() {
  return request<AuthUser & { sub?: string }>('/auth/me')
}

export function resolveMediaUrl(value?: string | null) {
  if (!value) {
    return undefined
  }

  if (value.startsWith('http://') || value.startsWith('https://') || value.startsWith('data:')) {
    return value
  }

  if (value.startsWith('/uploads/')) {
    return `${getApiBaseUrl()}${value}`
  }

  return value
}
