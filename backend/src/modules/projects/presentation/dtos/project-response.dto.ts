import type { ProjectCaptions, ProjectLocalizedContent } from '../../domain/entities/project';

export interface ProjectResponseDto {
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
  localizedContent?: ProjectLocalizedContent;
  captions?: ProjectCaptions;
  featured: boolean;
  createdAt: Date;
}
