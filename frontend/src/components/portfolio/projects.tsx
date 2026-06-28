"use client"

import { useState } from "react"
import { AlertCircle, Loader2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "./container"
import { ProjectCard, type Project } from "./project-card"
import { ProjectModal } from "./project-modal"
import { FadeIn } from "@/components/ui/fade-in"
import { projectsContent } from "@/lib/content"
import { useProjects } from "@/hooks/use-projects"

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const { projects, isLoading, error } = useProjects()

  function handleSelectProject(project: Project) {
    setSelectedProject(project)
  }

  return (
    <section id="projects" className="py-24 sm:py-32">
      <Container>
        <FadeIn className="mb-12">
          <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
            <div className="max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
                {projectsContent.title}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">
                {projectsContent.subtitle}
              </p>
            </div>
            <Button
              as="a"
              href="#contact"
              className="rounded-full shrink-0"
            >
              Quero um case assim
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </FadeIn>

        {isLoading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Carregando cases...
          </div>
        ) : error ? (
          <div className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card py-8 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4 text-destructive" />
            {error}
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 py-16 text-center text-muted-foreground">
            Nenhum case publicado ainda.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => handleSelectProject(project)}
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
