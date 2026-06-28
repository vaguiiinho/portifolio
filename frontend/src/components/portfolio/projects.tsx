"use client"

import { useState } from "react"
import { AlertCircle, Loader2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "./container"
import { ProjectCard, type Project } from "./project-card"
import { ProjectModal } from "./project-modal"
import { ProjectFormModal } from "./project-form-modal"
import { FadeIn } from "@/components/ui/fade-in"
import { projectsData } from "@/data/site"
import { useProjects } from "@/hooks/use-projects"
import { deleteProject } from "@/lib/api"

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projectFormOpen, setProjectFormOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const { projects, isLoading, error, reloadProjects } = useProjects()

  function handleCreateProject() {
    setSelectedProject(null)
    setEditingProject(null)
    setProjectFormOpen(true)
  }

  function handleEditProject(project: Project) {
    setSelectedProject(null)
    setEditingProject(project)
    setProjectFormOpen(true)
  }

  async function handleSavedProject() {
    await reloadProjects()
  }

  async function handleDeleteProject(project: Project) {
    const confirmed = window.confirm(`Delete "${project.title}"?`)

    if (!confirmed) {
      return
    }

    try {
      await deleteProject(project.id)
      await reloadProjects()

      if (selectedProject?.id === project.id) {
        setSelectedProject(null)
      }
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Failed to delete project")
    }
  }

  return (
    <section id="projects" className="py-24 sm:py-32">
      <Container>
        <FadeIn className="mb-12">
          <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
                {projectsData.title}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">
                {projectsData.subtitle}
              </p>
            </div>
            <Button
              type="button"
              onClick={handleCreateProject}
              className="rounded-full shrink-0"
            >
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </div>
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
        ) : projects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 py-16 text-center text-muted-foreground">
            No projects found yet. Create the first one.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
                onEdit={() => handleEditProject(project)}
                onDelete={() => handleDeleteProject(project)}
              />
            ))}
          </div>
        )}
      </Container>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onEdit={selectedProject ? () => handleEditProject(selectedProject) : undefined}
        onDelete={selectedProject ? () => handleDeleteProject(selectedProject) : undefined}
      />

      <ProjectFormModal
        key={`${editingProject?.id ?? "new"}-${projectFormOpen ? "open" : "closed"}`}
        open={projectFormOpen}
        project={editingProject}
        onClose={() => {
          setProjectFormOpen(false)
          setEditingProject(null)
        }}
        onSaved={handleSavedProject}
      />
    </section>
  )
}
