"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Loader2, Plus, PencilLine, Upload } from "lucide-react"
import { RemoveScroll } from "react-remove-scroll"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { createProject, updateProject, resolveMediaUrl } from "@/lib/api"
import {
  buildInitialProjectFormState,
  buildProjectFormData,
  validateProjectForm,
  type ProjectFormState,
} from "./project-form-modal.utils"
import { getProjectFormContent } from "@/lib/content/localized"
import type { Locale } from "@/lib/locale"
import type { Project } from "./project-card"

interface ProjectFormModalProps {
  open: boolean
  project: Project | null
  onClose: () => void
  onSaved: () => Promise<void> | void
  locale: Locale
}

export function ProjectFormModal({
  open,
  project,
  onClose,
  onSaved,
  locale,
}: ProjectFormModalProps) {
  const [values, setValues] = useState<ProjectFormState>(buildInitialProjectFormState(project))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedVideoFile, setSelectedVideoFile] = useState<File | null>(null)
  const projectFormContent = getProjectFormContent(locale)
  const isEditing = Boolean(project)
  const currentVideoUrl = resolveMediaUrl(project?.videoUrl)
  const title = isEditing ? projectFormContent.titleEdit : projectFormContent.titleNew
  const submitLabel = isEditing ? projectFormContent.submitLabelEdit : projectFormContent.submitLabelNew
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

    const validationError = validateProjectForm(values, locale)

    if (validationError) {
      setError(validationError)
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)
      const formData = buildProjectFormData(values, selectedVideoFile)

      if (project) {
        await updateProject(project.id, formData)
      } else {
        await createProject(formData)
      }

      await onSaved()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : locale === "en" ? "Failed to save project" : "Falha ao salvar o projeto")
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
                aria-label={projectFormContent.closeLabel}
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
                      {projectFormContent.helperText.submitHelp}
                    </p>
                  </div>
                </div>

                <div className="grid gap-5">
                  <FormField
                    id="project-title"
                    name="title"
                    label={projectFormContent.labels.title}
                    placeholder={projectFormContent.placeholders.title}
                    required
                    value={values.title}
                    onChange={(event) =>
                      setValues((current) => ({ ...current, title: event.target.value }))
                    }
                  />
                  <FormField
                    id="project-description"
                    name="description"
                    label={projectFormContent.labels.description}
                    placeholder={projectFormContent.placeholders.description}
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
                    label={projectFormContent.labels.techStack}
                    placeholder={projectFormContent.placeholders.techStack}
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
                      label={projectFormContent.labels.githubUrl}
                      placeholder={projectFormContent.placeholders.githubUrl}
                      type="url"
                      value={values.githubUrl}
                      onChange={(event) =>
                        setValues((current) => ({ ...current, githubUrl: event.target.value }))
                      }
                    />
                    <FormField
                      id="project-live-url"
                      name="liveUrl"
                      label={projectFormContent.labels.liveUrl}
                      placeholder={projectFormContent.placeholders.liveUrl}
                      type="url"
                      value={values.liveUrl}
                      onChange={(event) =>
                        setValues((current) => ({ ...current, liveUrl: event.target.value }))
                      }
                    />
                    <FormField
                      id="project-video-url"
                      name="videoUrl"
                      label={projectFormContent.labels.videoUrl}
                      placeholder={projectFormContent.placeholders.videoUrl}
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
                          <p className="text-sm font-medium">{projectFormContent.helperText.videoCurrent}</p>
                          <span className="text-xs text-muted-foreground">
                            {projectFormContent.helperText.videoKeepExisting}
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
                      {projectFormContent.labels.videoFile}
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
                        ? `${projectFormContent.helperText.selectedFilePrefix}: ${selectedVideoFile.name}`
                        : projectFormContent.helperText.videoUpload}
                    </p>
                  </div>
                  <div className="space-y-4 rounded-2xl border border-border bg-secondary/20 p-4">
                    <div>
                      <h3 className="text-sm font-semibold">{projectFormContent.helperText.detailsTitle}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {projectFormContent.helperText.detailsDescription}
                      </p>
                    </div>

                    <FormField
                      id="project-problem-title"
                      name="problemTitle"
                      label={projectFormContent.labels.problemTitle}
                      placeholder={projectFormContent.placeholders.problemTitle}
                      value={values.problemTitle}
                      onChange={(event) =>
                        setValues((current) => ({ ...current, problemTitle: event.target.value }))
                      }
                    />
                    <FormField
                      id="project-problem-description"
                      name="problemDescription"
                      label={projectFormContent.labels.problemDescription}
                      placeholder={projectFormContent.placeholders.problemDescription}
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
                      label={projectFormContent.labels.solutionTitle}
                      placeholder={projectFormContent.placeholders.solutionTitle}
                      value={values.solutionTitle}
                      onChange={(event) =>
                        setValues((current) => ({ ...current, solutionTitle: event.target.value }))
                      }
                    />
                    <FormField
                      id="project-solution-description"
                      name="solutionDescription"
                      label={projectFormContent.labels.solutionDescription}
                      placeholder={projectFormContent.placeholders.solutionDescription}
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
                      label={projectFormContent.labels.resultTitle}
                      placeholder={projectFormContent.placeholders.resultTitle}
                      value={values.resultTitle}
                      onChange={(event) =>
                        setValues((current) => ({ ...current, resultTitle: event.target.value }))
                      }
                    />
                    <FormField
                      id="project-result-description"
                      name="resultDescription"
                      label={projectFormContent.labels.resultDescription}
                      placeholder={projectFormContent.placeholders.resultDescription}
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
                    {projectFormContent.helperText.cancel}
                  </Button>
                  <Button type="submit" className="rounded-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {projectFormContent.helperText.saving}
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
