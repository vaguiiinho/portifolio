export interface Project {
  id: string
  title: string
  description: string
  image: string
  techStack: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
}

// TODO: Add real project data
export const projects: Project[] = []
