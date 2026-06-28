import type { ProjectPayload } from "@/lib/api"
import { getProjectFormContent } from "@/lib/content/localized"
import type { Locale } from "@/lib/locale"
import type { Project } from "./project-card"

export interface ProjectFormState {
  title: string
  description: string
  techStack: string
  githubUrl: string
  liveUrl: string
  videoUrl: string
  problemTitle: string
  problemDescription: string
  solutionTitle: string
  solutionDescription: string
  resultTitle: string
  resultDescription: string
}

export function buildInitialProjectFormState(project: Project | null): ProjectFormState {
  return {
    title: project?.title ?? "",
    description: project?.description ?? "",
    techStack: project?.techStack?.join(", ") ?? "",
    githubUrl: project?.githubUrl ?? "",
    liveUrl: project?.liveUrl ?? "",
    videoUrl: "",
    problemTitle: project?.problemTitle ?? "",
    problemDescription: project?.problemDescription ?? "",
    solutionTitle: project?.solutionTitle ?? "",
    solutionDescription: project?.solutionDescription ?? "",
    resultTitle: project?.resultTitle ?? "",
    resultDescription: project?.resultDescription ?? "",
  }
}

function parseTechStack(value: string) {
  return value
    .split(",")
    .map((tech) => tech.trim())
    .filter(Boolean)
}

function normalizeOptionalValue(value: string) {
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

export function isValidUrl(value: string) {
  if (!value.trim()) {
    return true
  }

  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

export function isValidVideoSource(value: string) {
  if (!value.trim()) {
    return true
  }

  return /^(https?:\/\/|data:video\/|\/uploads\/)/.test(value.trim())
}

export function buildProjectPayload(values: ProjectFormState): ProjectPayload {
  const payload: ProjectPayload = {
    title: values.title.trim(),
    description: values.description.trim(),
    techStack: parseTechStack(values.techStack),
  }

  const githubUrl = normalizeOptionalValue(values.githubUrl)
  const liveUrl = normalizeOptionalValue(values.liveUrl)
  const videoUrl = normalizeOptionalValue(values.videoUrl)

  if (githubUrl) {
    payload.githubUrl = githubUrl
  }

  if (liveUrl) {
    payload.liveUrl = liveUrl
  }

  if (videoUrl) {
    payload.videoUrl = videoUrl
  }

  return payload
}

export function buildProjectFormData(values: ProjectFormState, videoFile: File | null) {
  const payload = buildProjectPayload(values)
  const formData = new FormData()

  formData.append("title", payload.title)
  formData.append("description", payload.description)
  formData.append("techStack", payload.techStack.join(","))

  if (payload.githubUrl) {
    formData.append("githubUrl", payload.githubUrl)
  }

  if (payload.liveUrl) {
    formData.append("liveUrl", payload.liveUrl)
  }

  if (videoFile) {
    formData.append("videoFile", videoFile)
  } else if (payload.videoUrl) {
    formData.append("videoUrl", payload.videoUrl)
  }

  if (values.problemTitle.trim()) {
    formData.append("problemTitle", values.problemTitle.trim())
  }

  if (values.problemDescription.trim()) {
    formData.append("problemDescription", values.problemDescription.trim())
  }

  if (values.solutionTitle.trim()) {
    formData.append("solutionTitle", values.solutionTitle.trim())
  }

  if (values.solutionDescription.trim()) {
    formData.append("solutionDescription", values.solutionDescription.trim())
  }

  if (values.resultTitle.trim()) {
    formData.append("resultTitle", values.resultTitle.trim())
  }

  if (values.resultDescription.trim()) {
    formData.append("resultDescription", values.resultDescription.trim())
  }

  return formData
}

export function validateProjectForm(values: ProjectFormState, locale: Locale) {
  const projectFormContent = getProjectFormContent(locale)
  const payload = buildProjectPayload(values)
  const title = payload.title.trim()
  const description = payload.description.trim()

  if (title.length < 3) {
    return projectFormContent.validation.titleTooShort
  }

  if (description.length < 10) {
    return projectFormContent.validation.descriptionTooShort
  }

  if (payload.techStack.length === 0) {
    return projectFormContent.validation.noTechStack
  }

  if (!isValidUrl(payload.githubUrl ?? "")) {
    return projectFormContent.validation.invalidGithubUrl
  }

  if (!isValidUrl(payload.liveUrl ?? "")) {
    return projectFormContent.validation.invalidLiveUrl
  }

  if (!isValidVideoSource(payload.videoUrl ?? "")) {
    return projectFormContent.validation.invalidVideoSource
  }

  return null
}
