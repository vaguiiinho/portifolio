"use client"

import { useEffect, useState } from "react"
import { fetchProjects, type ApiProject } from "@/lib/api"
import type { Project } from "@/components/portfolio/project-card"

function mapProject(project: ApiProject): Project {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    image: project.title,
    techStack: project.techStack,
    liveUrl: project.liveUrl ?? undefined,
    githubUrl: project.githubUrl ?? undefined,
    featured: false,
  }
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadProjects = async (cancelledRef?: { current: boolean }) => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await fetchProjects()

      if (!cancelledRef?.current) {
        setProjects(data.map(mapProject))
      }
    } catch (err) {
      if (!cancelledRef?.current) {
        setError(err instanceof Error ? err.message : "Failed to load projects")
      }
    } finally {
      if (!cancelledRef?.current) {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    const cancelledRef = { current: false }
    loadProjects(cancelledRef)

    return () => {
      cancelledRef.current = true
    }
  }, [])

  return { projects, isLoading, error, reloadProjects: loadProjects }
}
