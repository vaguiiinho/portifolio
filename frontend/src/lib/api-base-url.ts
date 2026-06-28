function normalizeBaseUrl(value?: string | null) {
  const trimmed = value?.trim()

  if (!trimmed) {
    return undefined
  }

  return trimmed.replace(/\/$/, '')
}

function isServerSide() {
  return typeof window === 'undefined'
}

export function getApiBaseUrlCandidates() {
  const primary = isServerSide()
    ? normalizeBaseUrl(process.env.API_INTERNAL_URL) ??
      normalizeBaseUrl(process.env.NEXT_PUBLIC_API_URL) ??
      'http://localhost:3001'
    : normalizeBaseUrl(process.env.NEXT_PUBLIC_API_URL) ?? 'http://localhost:3001'

  if (!isServerSide()) {
    return [primary]
  }

  if (primary === 'http://backend:3001') {
    return [primary]
  }

  return [primary, 'http://backend:3001']
}

export function getApiBaseUrl() {
  return getApiBaseUrlCandidates()[0]
}

export async function fetchFromApi(path: string, init?: RequestInit) {
  const candidates = getApiBaseUrlCandidates()
  let lastError: unknown

  for (const baseUrl of candidates) {
    try {
      return await fetch(`${baseUrl}${path}`, init)
    } catch (error) {
      lastError = error
    }
  }

  throw lastError instanceof Error ? lastError : new Error('fetch failed')
}
