import { request } from "./client"
import type { ApiStats } from "./types"
export const fetchStats = () => request<ApiStats>("/stats")
