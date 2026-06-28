"use client"

import type { MouseEvent } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "./badge"
import { cn } from "@/lib/utils"
import { getProjectsContent } from "@/lib/content/localized"
import type { Locale } from "@/lib/locale"

export interface Project {
  id: string
  title: string
  description: string
  image: string
  techStack: string[]
  liveUrl?: string
  githubUrl?: string
  videoUrl?: string
  problemTitle?: string
  problemDescription?: string
  solutionTitle?: string
  solutionDescription?: string
  resultTitle?: string
  resultDescription?: string
  featured?: boolean
}

interface ProjectCardProps {
  project: Project
  index: number
  onClick?: () => void
  onDetailsClick?: () => void
  showDetailsAction?: boolean
  locale: Locale
}

export function ProjectCard({ project, index, onClick, onDetailsClick, showDetailsAction = false, locale }: ProjectCardProps) {
  const projectContent = getProjectsContent(locale)
  const initial = project.title?.charAt(0) || "P"
  const fallbackDescriptions =
    locale === "en"
      ? {
          problem: "Problem",
          solution: "Solution",
          result: "Result",
          emptyDescription: "Description not provided.",
        }
      : {
          problem: "Problema",
          solution: "Solução",
          result: "Resultado",
          emptyDescription: "Descrição não informada.",
        }

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
          "relative bg-card border border-border rounded-2xl overflow-hidden",
          onClick ? "cursor-pointer" : "cursor-default",
          "transition-all duration-300",
          onClick ? "hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1" : "",
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
                {initial}
              </div>
            </div>
            
            {/* Overlay on Hover */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              {project.liveUrl && (
                <Button as="a" href={project.liveUrl} target="_blank" rel="noopener noreferrer" size="sm" className="rounded-full" onClick={(e: MouseEvent<HTMLAnchorElement>) => e.stopPropagation()}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {projectContent.modal.viewLiveDemoText}
                </Button>
              )}
              {project.githubUrl && (
                <Button as="a" href={project.githubUrl} target="_blank" rel="noopener noreferrer" variant="outline" size="sm" className="rounded-full" onClick={(e: MouseEvent<HTMLAnchorElement>) => e.stopPropagation()}>
                  <Github className="mr-2 h-4 w-4" />
                  {projectContent.modal.viewSourceCodeText}
                </Button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                {project.featured && (
                  <span className="inline-flex items-center rounded-full border border-border bg-secondary/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {locale === "en" ? "Featured" : "Destaque"}
                  </span>
                )}
              </div>
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

            <div className="grid gap-3 border-t border-border pt-4 text-xs text-muted-foreground sm:grid-cols-3">
              <div className="space-y-1">
                <p className="font-medium text-foreground">
                  {project.problemTitle || fallbackDescriptions.problem}
                </p>
                <p className="line-clamp-2 text-pretty">
                  {project.problemDescription || fallbackDescriptions.emptyDescription}
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-foreground">
                  {project.solutionTitle || fallbackDescriptions.solution}
                </p>
                <p className="line-clamp-2 text-pretty">
                  {project.solutionDescription || fallbackDescriptions.emptyDescription}
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-foreground">
                  {project.resultTitle || fallbackDescriptions.result}
                </p>
                <p className="line-clamp-2 text-pretty">
                  {project.resultDescription || fallbackDescriptions.emptyDescription}
                </p>
              </div>
            </div>

            {showDetailsAction && onDetailsClick && (
              <div className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={(event) => {
                    event.stopPropagation()
                    onDetailsClick()
                  }}
                >
                  <Eye className="h-4 w-4" />
                  {locale === "en" ? "Open details" : "Abrir detalhes"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}
