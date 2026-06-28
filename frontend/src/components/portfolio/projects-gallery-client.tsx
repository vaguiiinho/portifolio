"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectCard, type Project } from "./project-card"
import { ProjectModal } from "./project-modal"
import { ProjectFormModal } from "./project-form-modal"
import { trackStatsEvent } from "@/lib/analytics"
import type { Locale } from "@/lib/locale"

interface ProjectsGalleryClientProps {
  projects: Project[]
  error?: string | null
  allowCreate?: boolean
  locale: Locale
}

export function ProjectsGalleryClient({ projects, error, allowCreate = false, locale }: ProjectsGalleryClientProps) {
  const router = useRouter()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  return (
    <>
      {allowCreate && (
        <div className="mb-6 flex justify-end">
          <Button onClick={() => setIsCreateOpen(true)} className="rounded-full">
            <Plus className="h-4 w-4" />
            {locale === "en" ? "New project" : "Novo projeto"}
          </Button>
        </div>
      )}

      {error ? (
        <div className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card py-8 text-sm text-muted-foreground">
          <AlertCircle className="h-4 w-4 text-destructive" />
          {error}
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 py-16 text-center text-muted-foreground">
          {locale === "en" ? "No published case yet." : "Nenhum case publicado ainda."}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              locale={locale}
              onClick={() => {
                trackStatsEvent(`project:view:${project.id}`)
                setSelectedProject(project)
              }}
            />
          ))}
        </div>
      )}

      <ProjectModal project={selectedProject} locale={locale} onClose={() => setSelectedProject(null)} />
      <ProjectFormModal
        open={isCreateOpen}
        project={null}
        onClose={() => setIsCreateOpen(false)}
        onSaved={() => router.refresh()}
        locale={locale}
      />
    </>
  )
}
