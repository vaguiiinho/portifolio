import type { ApiStats } from "./api"

export interface HeroStat {
  value: string
  label: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:3001"

function mapHeroStats(data: ApiStats): HeroStat[] {
  return [
    { value: `${data.projectsCount}+`, label: "Cases publicados" },
    { value: `${data.visitors}+`, label: "Visitas rastreadas" },
    { value: "5+", label: "Anos de experiência" },
  ]
}

export async function fetchHeroStats(): Promise<HeroStat[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/stats`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    const data = (await response.json()) as ApiStats
    return mapHeroStats(data)
  } catch {
    return [
      { value: "5+", label: "Anos de experiência" },
      { value: "50+", label: "Projetos entregues" },
      { value: "30+", label: "Clientes atendidos" },
    ]
  }
}
