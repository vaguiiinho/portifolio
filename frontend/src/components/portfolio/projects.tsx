"use client"

import { useState } from "react"
import { AlertCircle, Loader2 } from "lucide-react"
import { Container } from "./container"
import { ProjectCard, type Project } from "./project-card"
import { ProjectModal } from "./project-modal"
import { FadeIn } from "@/components/ui/fade-in"
import { projectsData } from "@/data/site"
import { useProjects } from "@/hooks/use-projects"

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const { projects, isLoading, error } = useProjects()

  return (
    <section id="projects" className="py-24 sm:py-32">
      <Container>
        <FadeIn className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            {projectsData.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {projectsData.subtitle}
          </p>
        </FadeIn>

        {isLoading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Loading projects...
          </div>
        ) : error ? (
          <div className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card py-8 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4 text-destructive" />
            {error}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </Container>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}
