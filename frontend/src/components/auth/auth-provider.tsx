"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react"
import {
  fetchCurrentUser,
  login as loginRequest,
  type AuthSession,
  type AuthUser,
  type LoginPayload,
  readAuthSession,
  writeAuthSession,
} from "@/lib/api"

interface AuthContextValue {
  user: AuthUser | null
  accessToken: string | null
  isLoading: boolean
  isAuthenticated: boolean
  authErrorStatus: number | null
  login: (payload: LoginPayload) => Promise<AuthSession>
  logout: () => void
  refreshSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

function normalizeUser(user: AuthSession["user"] | { sub: string; email: string; role: AuthUser["role"] }): AuthUser {
  if ("sub" in user) {
    return {
      id: user.sub,
      email: user.email,
      role: user.role,
    }
  }

  return user
}

export function AuthProvider({ children }: PropsWithChildren) {
  const initialSession = typeof window !== "undefined" ? readAuthSession() : null
  const [user, setUser] = useState<AuthUser | null>(initialSession?.user ?? null)
  const [accessToken, setAccessToken] = useState<string | null>(initialSession?.accessToken ?? null)
  const [isLoading, setIsLoading] = useState(Boolean(initialSession))
  const [authErrorStatus, setAuthErrorStatus] = useState<number | null>(null)

  useEffect(() => {
    if (!accessToken) {
      return
    }

    void refreshStoredSession(accessToken)
  }, [accessToken])

  useEffect(() => {
    function handleAuthError(event: Event) {
      const customEvent = event as CustomEvent<{ status?: number }>
      const status = customEvent.detail?.status

      if (status !== 401 && status !== 403) {
        return
      }

      setAuthErrorStatus(status)
      writeAuthSession(null)
      setUser(null)
      setAccessToken(null)
    }

    window.addEventListener("portfolio:auth-error", handleAuthError)

    return () => {
      window.removeEventListener("portfolio:auth-error", handleAuthError)
    }
  }, [])

  async function refreshStoredSession(token: string) {
    try {
      const currentUser = await fetchCurrentUser()
      const normalizedUser = normalizeUser(currentUser)
      const nextSession = {
        accessToken: token,
        user: normalizedUser,
      }

      setUser(normalizedUser)
      setAccessToken(token)
      writeAuthSession(nextSession)
    } catch {
      writeAuthSession(null)
      setUser(null)
      setAccessToken(null)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleLogin(payload: LoginPayload) {
    const session = await loginRequest(payload)
    const normalizedSession = {
      accessToken: session.accessToken,
      user: normalizeUser(session.user),
    }

    setUser(normalizedSession.user)
    setAccessToken(normalizedSession.accessToken)
    setAuthErrorStatus(null)
    writeAuthSession(normalizedSession)

    return normalizedSession
  }

  function logout() {
    writeAuthSession(null)
    setUser(null)
    setAccessToken(null)
    setAuthErrorStatus(null)
  }

  async function refreshSession() {
    if (!accessToken) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    await refreshStoredSession(accessToken)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isLoading,
        isAuthenticated: Boolean(user && accessToken),
        authErrorStatus,
        login: handleLogin,
        logout,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }

  return context
}
