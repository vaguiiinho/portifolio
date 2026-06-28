"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Github, CheckCircle2, Play, PencilLine, Trash2 } from "lucide-react"
import { RemoveScroll } from "react-remove-scroll"
import { Button } from "@/components/ui/button"
import { Badge } from "./badge"
import type { Project } from "./project-card"
import { getProjectsContent } from "@/lib/content/localized"
import { resolveMediaUrl } from "@/lib/api"
import type { Locale } from "@/lib/locale"

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
  onEdit?: (project: Project) => void
  onDelete?: (project: Project) => void | Promise<void>
  canManage?: boolean
  locale: Locale
}

export function ProjectModal({ project, onClose, onEdit, onDelete, canManage = false, locale }: ProjectModalProps) {
  const projectContent = getProjectsContent(locale)
  const initial = project?.title?.charAt(0) || "P"
  const sections = [
    {
      title: project?.problemTitle || projectContent.modal.sections[0].title,
      description: project?.problemDescription || projectContent.modal.sections[0].description,
    },
    {
      title: project?.solutionTitle || projectContent.modal.sections[1].title,
      description: project?.solutionDescription || projectContent.modal.sections[1].description,
    },
    {
      title: project?.resultTitle || projectContent.modal.sections[2].title,
      description: project?.resultDescription || projectContent.modal.sections[2].description,
    },
  ]

  return (
    <AnimatePresence>
      {project && (
        <RemoveScroll enabled>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-2xl shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-secondary/80 hover:bg-secondary transition-colors"
                aria-label={locale === "en" ? "Close modal" : "Fechar modal"}
              >
                <X className="h-5 w-5" />
              </button>

              {/* Banner */}
              <div className="relative aspect-video bg-gradient-to-br from-accent/20 to-secondary flex items-center justify-center">
                <div className="text-8xl font-bold text-muted-foreground/20">
                  {initial}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-8">
                {/* Header */}
                <div>
                  <h2 className="text-2xl font-bold">{project.title}</h2>
                  <p className="mt-2 text-muted-foreground text-pretty leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {project.videoUrl && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Play className="h-4 w-4 text-accent" />
                      <h3 className="font-semibold">{locale === "en" ? "Presentation video" : "Vídeo de apresentação"}</h3>
                    </div>
                    <div className="overflow-hidden rounded-2xl border border-border bg-black">
                      <video
                        controls
                        preload="metadata"
                        className="aspect-video w-full"
                        src={resolveMediaUrl(project.videoUrl)}
                      />
                    </div>
                  </div>
                )}

                {/* Problem / Solution / Result */}
                <div className="grid gap-6 sm:grid-cols-3">
                  {sections.map((item) => (
                    <div key={item.title} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                        <h3 className="font-semibold">{item.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground text-pretty">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div>
                  <h3 className="mb-3 font-semibold">
                    {locale === "en" ? "Technologies used" : "Tecnologias usadas"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="glow">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                  {canManage && project.liveUrl && (
                    <Button
                      as="a"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full"
                      metricKey={`project:live:${project.id}`}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {locale === "en" ? "View demo" : "Ver demo"}
                    </Button>
                  )}
                  {canManage && project.githubUrl && (
                    <Button
                      as="a"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      className="rounded-full"
                      metricKey={`project:source:${project.id}`}
                    >
                      <Github className="mr-2 h-4 w-4" />
                      {locale === "en" ? "View code" : "Ver código"}
                    </Button>
                  )}
                </div>

                {canManage && project && (
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                    <Button
                      variant="outline"
                      className="rounded-full"
                      onClick={() => onEdit?.(project)}
                    >
                      <PencilLine className="h-4 w-4" />
                      {locale === "en" ? "Edit project" : "Editar projeto"}
                    </Button>
                    <Button
                      variant="destructive"
                      className="rounded-full"
                      onClick={() => void onDelete?.(project)}
                    >
                      <Trash2 className="h-4 w-4" />
                      {locale === "en" ? "Delete project" : "Excluir projeto"}
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
        </motion.div>
      </RemoveScroll>
      )}
    </AnimatePresence>
  )
}
