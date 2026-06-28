import { getApiBaseUrl } from './api-base-url'

function toPayload(key: string, increment = 1) {
  return JSON.stringify({ key, increment })
}

export function trackStatsEvent(key: string, increment = 1) {
  if (typeof window === 'undefined' || !key.trim()) {
    return
  }

  const url = `${getApiBaseUrl()}/stats/events`
  const body = toPayload(key.trim(), increment)

  if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
    const blob = new Blob([body], { type: 'application/json' })
    navigator.sendBeacon(url, blob)
    return
  }

  void fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
    keepalive: true,
  })
}
