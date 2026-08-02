import type { ApiProject } from "./api"
import type { Project } from "@/components/portfolio/project-card"
import type { Locale } from "@/lib/locale"

export function mapApiProjectToPortfolioProject(project: ApiProject, locale: Locale = "pt"): Project {
  const content = project.localizedContent?.[locale] ?? project.localizedContent?.pt
  return {
    id: project.id,
    title: content?.title ?? project.title,
    description: content?.description ?? project.description,
    image: content?.title ?? project.title,
    techStack: project.techStack,
    liveUrl: project.liveUrl ?? undefined,
    githubUrl: project.githubUrl ?? undefined,
    videoUrl: project.videoUrl ?? undefined,
    problemTitle: content?.problemTitle ?? project.problemTitle ?? undefined,
    problemDescription: content?.problemDescription ?? project.problemDescription ?? undefined,
    solutionTitle: content?.solutionTitle ?? project.solutionTitle ?? undefined,
    solutionDescription: content?.solutionDescription ?? project.solutionDescription ?? undefined,
    resultTitle: content?.resultTitle ?? project.resultTitle ?? undefined,
    resultDescription: content?.resultDescription ?? project.resultDescription ?? undefined,
    captions: project.captions ?? undefined,
    featured: project.featured ?? false,
  }
}
