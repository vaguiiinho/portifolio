"use client"

import { useEffect } from "react"
import { trackStatsEvent } from "@/lib/analytics"

interface MetricBeaconProps {
  eventKey: string
}

export function MetricBeacon({ eventKey }: MetricBeaconProps) {
  useEffect(() => {
    trackStatsEvent(eventKey)
  }, [eventKey])

  return null
}
