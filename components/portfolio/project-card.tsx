"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "./badge"
import { cn } from "@/lib/utils"

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

interface ProjectCardProps {
  project: Project
  index: number
  onClick?: () => void
}

export function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div
        onClick={onClick}
        className={cn(
          "relative bg-card border border-border rounded-2xl overflow-hidden cursor-pointer",
          "transition-all duration-300",
          "hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5",
          "hover:-translate-y-1"
        )}
      >
        {/* Glow Effect on Hover */}
        <div className="absolute -inset-px bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
        
        <div className="relative">
          {/* Image */}
          <div className="relative aspect-video overflow-hidden bg-secondary">
            <div 
              className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center"
            >
              <div className="text-6xl font-bold text-muted-foreground/20">
                {project.title.charAt(0)}
              </div>
            </div>
            
            {/* Overlay on Hover */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              {project.liveUrl && (
                <Button asChild size="sm" className="rounded-full">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button asChild variant="outline" size="sm" className="rounded-full">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2 text-pretty">
                {project.description}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="glow">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
