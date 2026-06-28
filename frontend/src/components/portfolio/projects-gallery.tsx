import { fetchProjects } from "@/lib/api"
import { mapApiProjectToPortfolioProject } from "@/lib/project-mapper"
import type { Project } from "./project-card"
import { ProjectsGalleryClient } from "./projects-gallery-client"

export async function ProjectsGallery() {
  let errorMessage: string | null = null
  let projects: Project[] = []

  try {
    const response = await fetchProjects()
    projects = response.map(mapApiProjectToPortfolioProject)
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Falha ao carregar os cases"
  }

  return <ProjectsGalleryClient projects={projects} error={errorMessage} />
}
