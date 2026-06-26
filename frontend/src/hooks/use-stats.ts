"use client"

import { useEffect, useState } from "react"
import { fetchStats } from "@/lib/api"

export interface HeroStat {
  value: string
  label: string
}

export function useStats() {
  const [stats, setStats] = useState<HeroStat[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadStats() {
      try {
        setIsLoading(true)
        setError(null)
        const data = await fetchStats()

        if (!cancelled) {
          setStats([
            { value: `${data.projectsCount}+`, label: "Projects Delivered" },
            { value: `${data.visitors}+`, label: "Visitors Tracked" },
            { value: "5+", label: "Years Experience" },
          ])
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load stats")
          setStats([
            { value: "5+", label: "Years Experience" },
            { value: "50+", label: "Projects Delivered" },
            { value: "30+", label: "Happy Clients" },
          ])
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    loadStats()

    return () => {
      cancelled = true
    }
  }, [])

  return { stats, isLoading, error }
}
