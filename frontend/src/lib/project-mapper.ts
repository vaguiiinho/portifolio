import type { ApiProject } from "./api"
import type { Project } from "@/components/portfolio/project-card"

export function mapApiProjectToPortfolioProject(project: ApiProject): Project {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    image: project.title,
    techStack: project.techStack,
    liveUrl: project.liveUrl ?? undefined,
    githubUrl: project.githubUrl ?? undefined,
    videoUrl: project.videoUrl ?? undefined,
    problemTitle: project.problemTitle ?? undefined,
    problemDescription: project.problemDescription ?? undefined,
    solutionTitle: project.solutionTitle ?? undefined,
    solutionDescription: project.solutionDescription ?? undefined,
    resultTitle: project.resultTitle ?? undefined,
    resultDescription: project.resultDescription ?? undefined,
    featured: false,
  }
}
