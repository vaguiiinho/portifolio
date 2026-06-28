"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Loader2, Plus, PencilLine, Upload } from "lucide-react"
import { RemoveScroll } from "react-remove-scroll"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { createProject, updateProject, resolveMediaUrl, type ProjectPayload } from "@/lib/api"
import type { Project } from "./project-card"

interface ProjectFormModalProps {
  open: boolean
  project: Project | null
  onClose: () => void
  onSaved: () => Promise<void> | void
}

interface ProjectFormState {
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

function buildInitialState(project: Project | null): ProjectFormState {
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

function normalizeUrl(value: string) {
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

function isValidUrl(value: string) {
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

function isValidVideoSource(value: string) {
  if (!value.trim()) {
    return true
  }

  return /^(https?:\/\/|data:video\/|\/uploads\/)/.test(value.trim())
}

function buildPayload(values: ProjectFormState): ProjectPayload {
  const payload: ProjectPayload = {
    title: values.title.trim(),
    description: values.description.trim(),
    techStack: parseTechStack(values.techStack),
  }

  const githubUrl = normalizeUrl(values.githubUrl)
  const liveUrl = normalizeUrl(values.liveUrl)

  if (githubUrl) {
    payload.githubUrl = githubUrl
  }

  if (liveUrl) {
    payload.liveUrl = liveUrl
  }

  const videoUrl = normalizeUrl(values.videoUrl)

  if (videoUrl) {
    payload.videoUrl = videoUrl
  }

  return payload
}

function buildFormData(values: ProjectFormState, videoFile: File | null) {
  const payload = buildPayload(values)
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

export function ProjectFormModal({
  open,
  project,
  onClose,
  onSaved,
}: ProjectFormModalProps) {
  const [values, setValues] = useState<ProjectFormState>(buildInitialState(project))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedVideoFile, setSelectedVideoFile] = useState<File | null>(null)
  const isEditing = Boolean(project)
  const currentVideoUrl = resolveMediaUrl(project?.videoUrl)
  const title = isEditing ? "Edit Project" : "New Project"
  const submitLabel = isEditing ? "Save changes" : "Create project"
  const Icon = isEditing ? PencilLine : Plus

  async function handleVideoFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      setSelectedVideoFile(null)
      return
    }

    setSelectedVideoFile(file)
    setValues((current) => ({ ...current, videoUrl: "" }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const payload = buildPayload(values)
    const title = payload.title.trim()
    const description = payload.description.trim()

    if (title.length < 3) {
      setError("Title must be at least 3 characters")
      return
    }

    if (description.length < 10) {
      setError("Description must be at least 10 characters")
      return
    }

    if (payload.techStack.length === 0) {
      setError("Add at least one technology")
      return
    }

    if (!isValidUrl(payload.githubUrl ?? "")) {
      setError("GitHub URL must be a valid URL")
      return
    }

    if (!isValidUrl(payload.liveUrl ?? "")) {
      setError("Live URL must be a valid URL")
      return
    }

    if (!isValidVideoSource(payload.videoUrl ?? "")) {
      setError("Video must be a valid URL, upload path, or video file")
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)
      const formData = buildFormData(values, selectedVideoFile)

      if (project) {
        await updateProject(project.id, formData)
      } else {
        await createProject(formData)
      }

      await onSaved()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save project")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <RemoveScroll enabled>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />

            <motion.form
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              onSubmit={handleSubmit}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-2xl shadow-2xl"
            >
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-secondary/80 hover:bg-secondary transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="p-8 space-y-8">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-muted-foreground">
                    <Icon className="h-4 w-4" />
                    {title}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground text-pretty">
                      Fill in the project data and save it to the backend.
                    </p>
                  </div>
                </div>

                <div className="grid gap-5">
                  <FormField
                    id="project-title"
                    name="title"
                    label="Title"
                    placeholder="Project title"
                    required
                    value={values.title}
                    onChange={(event) =>
                      setValues((current) => ({ ...current, title: event.target.value }))
                    }
                  />
                  <FormField
                    id="project-description"
                    name="description"
                    label="Description"
                    placeholder="Project description"
                    rows={5}
                    required
                    value={values.description}
                    onChange={(event) =>
                      setValues((current) => ({ ...current, description: event.target.value }))
                    }
                  />
                  <FormField
                    id="project-tech-stack"
                    name="techStack"
                    label="Technologies"
                    placeholder="React, Next.js, NestJS"
                    required
                    value={values.techStack}
                    onChange={(event) =>
                      setValues((current) => ({ ...current, techStack: event.target.value }))
                    }
                  />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField
                      id="project-github-url"
                      name="githubUrl"
                      label="GitHub URL"
                      placeholder="https://github.com/..."
                      type="url"
                      value={values.githubUrl}
                      onChange={(event) =>
                        setValues((current) => ({ ...current, githubUrl: event.target.value }))
                      }
                    />
                    <FormField
                      id="project-live-url"
                      name="liveUrl"
                      label="Live URL"
                      placeholder="https://..."
                      type="url"
                      value={values.liveUrl}
                      onChange={(event) =>
                        setValues((current) => ({ ...current, liveUrl: event.target.value }))
                      }
                    />
                    <FormField
                      id="project-video-url"
                      name="videoUrl"
                      label="Video URL"
                      placeholder="https://... or data:video/..."
                      type="text"
                      value={values.videoUrl}
                      onChange={(event) =>
                        setValues((current) => ({ ...current, videoUrl: event.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    {currentVideoUrl && (
                      <div className="space-y-2 rounded-2xl border border-border bg-secondary/20 p-3">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-medium">Current video</p>
                          <span className="text-xs text-muted-foreground">
                            Leave the URL empty to keep it unchanged
                          </span>
                        </div>
                        <video
                          controls
                          preload="metadata"
                          className="aspect-video w-full rounded-xl bg-black"
                          src={currentVideoUrl}
                        />
                      </div>
                    )}
                    <label htmlFor="project-video-file" className="flex items-center gap-2 text-sm font-medium">
                      <Upload className="h-4 w-4" />
                      Upload video file
                    </label>
                    <input
                      id="project-video-file"
                      name="videoFile"
                      type="file"
                      accept="video/*"
                      onChange={handleVideoFileChange}
                      className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-full file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-medium file:text-foreground hover:file:bg-secondary/80"
                    />
                    <p className="text-xs text-muted-foreground">
                      {selectedVideoFile
                        ? `Selected file: ${selectedVideoFile.name}`
                        : "Optional. Uploading a file avoids the JSON body size limit."}
                    </p>
                  </div>
                  <div className="space-y-4 rounded-2xl border border-border bg-secondary/20 p-4">
                    <div>
                      <h3 className="text-sm font-semibold">Project blocks</h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Edit the three sections shown inside the project detail modal.
                      </p>
                    </div>

                    <FormField
                      id="project-problem-title"
                      name="problemTitle"
                      label="Problem title"
                      placeholder="Problem"
                      value={values.problemTitle}
                      onChange={(event) =>
                        setValues((current) => ({ ...current, problemTitle: event.target.value }))
                      }
                    />
                    <FormField
                      id="project-problem-description"
                      name="problemDescription"
                      label="Problem description"
                      placeholder="What needed to be solved?"
                      rows={3}
                      value={values.problemDescription}
                      onChange={(event) =>
                        setValues((current) => ({
                          ...current,
                          problemDescription: event.target.value,
                        }))
                      }
                    />
                    <FormField
                      id="project-solution-title"
                      name="solutionTitle"
                      label="Solution title"
                      placeholder="Solution"
                      value={values.solutionTitle}
                      onChange={(event) =>
                        setValues((current) => ({ ...current, solutionTitle: event.target.value }))
                      }
                    />
                    <FormField
                      id="project-solution-description"
                      name="solutionDescription"
                      label="Solution description"
                      placeholder="How was it approached?"
                      rows={3}
                      value={values.solutionDescription}
                      onChange={(event) =>
                        setValues((current) => ({
                          ...current,
                          solutionDescription: event.target.value,
                        }))
                      }
                    />
                    <FormField
                      id="project-result-title"
                      name="resultTitle"
                      label="Result title"
                      placeholder="Result"
                      value={values.resultTitle}
                      onChange={(event) =>
                        setValues((current) => ({ ...current, resultTitle: event.target.value }))
                      }
                    />
                    <FormField
                      id="project-result-description"
                      name="resultDescription"
                      label="Result description"
                      placeholder="What changed?"
                      rows={3}
                      value={values.resultDescription}
                      onChange={(event) =>
                        setValues((current) => ({
                          ...current,
                          resultDescription: event.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                {error && (
                  <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                    {error}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-border">
                  <Button type="button" variant="outline" onClick={onClose} className="rounded-full">
                    Cancel
                  </Button>
                  <Button type="submit" className="rounded-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Icon className="h-4 w-4" />
                        {submitLabel}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.form>
          </motion.div>
        </RemoveScroll>
      )}
    </AnimatePresence>
  )
}
