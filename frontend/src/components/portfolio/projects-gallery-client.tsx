"use client"

import { useState } from "react"
import { AlertCircle } from "lucide-react"
import { ProjectCard, type Project } from "./project-card"
import { ProjectModal } from "./project-modal"

interface ProjectsGalleryClientProps {
  projects: Project[]
  error?: string | null
}

export function ProjectsGalleryClient({ projects, error }: ProjectsGalleryClientProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <>
      {error ? (
        <div className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card py-8 text-sm text-muted-foreground">
          <AlertCircle className="h-4 w-4 text-destructive" />
          {error}
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 py-16 text-center text-muted-foreground">
          Nenhum case publicado ainda.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      )}

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  )
}
