import { request } from "./client"
import type { ApiProject, ProjectPayload } from "./types"
const bodyFor = (payload: ProjectPayload | FormData) => payload instanceof FormData ? payload : JSON.stringify(payload)
export const fetchProjects = () => request<ApiProject[]>("/projects")
export const createProject = (payload: ProjectPayload | FormData) => request<ApiProject>("/projects", { method: "POST", body: bodyFor(payload) })
export const updateProject = (id: string, payload: ProjectPayload | FormData) => request<ApiProject>(`/projects/${id}`, { method: "PUT", body: bodyFor(payload) })
export const deleteProject = (id: string) => request<void>(`/projects/${id}`, { method: "DELETE" })
