export interface ApiProject {
  id: string
  title: string
  description: string
  techStack: string[]
  githubUrl?: string | null
  liveUrl?: string | null
  createdAt: string
  updatedAt: string
}

export interface ProjectPayload {
  title: string
  description: string
  techStack: string[]
  githubUrl?: string
  liveUrl?: string
}

export interface ApiStats {
  id: string
  projectsCount: number
  visitors: number
  updatedAt: string
}

export interface ContactPayload {
  name: string
  email: string
  message: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
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

export async function createProject(payload: ProjectPayload) {
  return request<ApiProject>('/projects', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function updateProject(id: string, payload: ProjectPayload) {
  return request<ApiProject>(`/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
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
