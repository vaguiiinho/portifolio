import { fetchFromApi, getApiBaseUrl } from './api-base-url'
import type { LocalizedContent, ServicesContent, TestimonialsContent } from './site-content'

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
  featured?: boolean
  createdAt: string
  updatedAt: string
}

export interface AuthUser {
  id: string
  email: string
  role: 'visitante' | 'administrador'
}

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
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
  featured?: boolean
}

export interface ConfigPayload {
  siteName?: string
  description?: string
  aboutBio?: LocalizedContent<string[]>
  servicesContent?: LocalizedContent<ServicesContent>
  testimonialsContent?: LocalizedContent<TestimonialsContent>
}

export interface ApiConfig {
  id: string
  siteName: string
  description: string
  aboutBio?: LocalizedContent<string[]>
  servicesContent?: LocalizedContent<ServicesContent>
  testimonialsContent?: LocalizedContent<TestimonialsContent>
  updatedAt: string
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

function isAuthError(status: number) {
  return status === 401 || status === 403
}

function isBrowser() {
  return typeof window !== 'undefined'
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
    ? init?.headers
    : {
        'Content-Type': 'application/json',
        ...(init?.headers ?? {}),
      }

  const response = await fetchFromApi(path, {
    ...init,
    credentials: 'include',
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
  const body =
    payload instanceof FormData
      ? payload
      : JSON.stringify(payload)

  return request<ApiProject>('/projects', {
    method: 'POST',
    body,
  })
}

export async function updateProject(id: string, payload: ProjectPayload | FormData) {
  const body =
    payload instanceof FormData
      ? payload
      : JSON.stringify(payload)

  return request<ApiProject>(`/projects/${id}`, {
    method: 'PUT',
    body,
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

export async function updateConfig(payload: ConfigPayload) {
  return request<ApiConfig>('/config', {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
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

export async function logout() {
  return request<void>('/auth/logout', {
    method: 'POST',
  })
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
