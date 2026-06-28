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

function isFormDataBody(body: unknown): body is FormData {
  if (typeof FormData === 'undefined' || !body) {
    return false
  }

  return body instanceof FormData || Object.prototype.toString.call(body) === '[object FormData]'
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const isFormData = isFormDataBody(init?.body)

  const response = await fetchFromApi(path, {
    ...init,
    cache: 'no-store',
    headers: isFormData
      ? init?.headers
      : {
          'Content-Type': 'application/json',
          ...(init?.headers ?? {}),
        },
  })

  if (!response.ok) {
    const fallbackMessage = `Request failed with status ${response.status}`
    let message = fallbackMessage

    try {
      const body = await response.json()
      message = body?.message || body?.error || fallbackMessage
    } catch {}

    throw new Error(message)
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
