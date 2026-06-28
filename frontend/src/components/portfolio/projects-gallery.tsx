import { fetchProjects } from "@/lib/api"
import { mapApiProjectToPortfolioProject } from "@/lib/project-mapper"
import type { Project } from "./project-card"
import { ProjectsGalleryClient } from "./projects-gallery-client"
import type { Locale } from "@/lib/locale"

interface ProjectsGalleryProps {
  allowCreate?: boolean
  locale: Locale
}

export async function ProjectsGallery({ allowCreate = false, locale }: ProjectsGalleryProps) {
  let errorMessage: string | null = null
  let projects: Project[] = []

  try {
    const response = await fetchProjects()
    projects = response.map(mapApiProjectToPortfolioProject)
  } catch (error) {
    errorMessage =
      error instanceof Error
        ? error.message
        : locale === "en"
          ? "Failed to load the cases"
          : "Falha ao carregar os cases"
  }

  return <ProjectsGalleryClient projects={projects} error={errorMessage} allowCreate={allowCreate} locale={locale} />
}
