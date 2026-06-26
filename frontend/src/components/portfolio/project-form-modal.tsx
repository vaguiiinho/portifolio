"use client"

import { useEffect, useState, type FormEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Loader2, Plus, PencilLine } from "lucide-react"
import { RemoveScroll } from "react-remove-scroll"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { createProject, updateProject, type ProjectPayload } from "@/lib/api"
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
}

function buildInitialState(project: Project | null): ProjectFormState {
  return {
    title: project?.title ?? "",
    description: project?.description ?? "",
    techStack: project?.techStack?.join(", ") ?? "",
    githubUrl: project?.githubUrl ?? "",
    liveUrl: project?.liveUrl ?? "",
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

  return payload
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
  const isEditing = Boolean(project)
  const title = isEditing ? "Edit Project" : "New Project"
  const submitLabel = isEditing ? "Save changes" : "Create project"
  const Icon = isEditing ? PencilLine : Plus

  useEffect(() => {
    if (open) {
      setValues(buildInitialState(project))
      setError(null)
    }
  }, [open, project])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const payload = buildPayload(values)

    if (payload.techStack.length === 0) {
      setError("Add at least one technology")
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)

      if (project) {
        await updateProject(project.id, payload)
      } else {
        await createProject(payload)
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
