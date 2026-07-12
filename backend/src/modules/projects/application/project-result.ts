import { Project } from '../domain/entities/project';

export interface ProjectResult {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  videoUrl?: string;
  problemTitle?: string;
  problemDescription?: string;
  solutionTitle?: string;
  solutionDescription?: string;
  resultTitle?: string;
  resultDescription?: string;
  featured: boolean;
  createdAt: Date;
}

export function toProjectResult(project: Project): ProjectResult {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    techStack: project.techStack,
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl,
    videoUrl: project.videoUrl,
    problemTitle: project.problemTitle,
    problemDescription: project.problemDescription,
    solutionTitle: project.solutionTitle,
    solutionDescription: project.solutionDescription,
    resultTitle: project.resultTitle,
    resultDescription: project.resultDescription,
    featured: project.featured,
    createdAt: project.createdAt,
  };
}
