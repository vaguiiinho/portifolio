"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Github, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "./badge"
import type { Project } from "./project-card"

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [project])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-2xl shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-secondary/80 hover:bg-secondary transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Banner */}
            <div className="relative aspect-video bg-gradient-to-br from-accent/20 to-secondary flex items-center justify-center">
              <div className="text-8xl font-bold text-muted-foreground/20">
                {project.title.charAt(0)}
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              {/* Header */}
              <div>
                <h2 className="text-2xl font-bold">{project.title}</h2>
                <p className="mt-2 text-muted-foreground text-pretty leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Problem / Solution / Result */}
              <div className="grid gap-6 sm:grid-cols-3">
                {[
                  { 
                    title: "Problem", 
                    description: "Users needed a faster, more intuitive way to manage their workflows without technical complexity." 
                  },
                  { 
                    title: "Solution", 
                    description: "Built a modern web application with real-time collaboration features and an intuitive drag-and-drop interface." 
                  },
                  { 
                    title: "Result", 
                    description: "Increased user productivity by 40% and reduced onboarding time from days to hours." 
                  },
                ].map((item, i) => (
                  <div key={item.title} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                      <h3 className="font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground text-pretty">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tech Stack */}
              <div>
                <h3 className="font-semibold mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="glow">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                {project.liveUrl && (
                  <Button asChild className="rounded-full">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Live Demo
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button asChild variant="outline" className="rounded-full">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      View Source Code
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
