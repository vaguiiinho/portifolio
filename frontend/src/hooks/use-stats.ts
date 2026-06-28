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
            { value: `${data.projectsCount}+`, label: "Cases publicados" },
            { value: `${data.visitors}+`, label: "Visitas rastreadas" },
            { value: "5+", label: "Anos de experiência" },
          ])
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Falha ao carregar as métricas")
          setStats([
            { value: "5+", label: "Anos de experiência" },
            { value: "50+", label: "Projetos entregues" },
            { value: "30+", label: "Clientes atendidos" },
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
