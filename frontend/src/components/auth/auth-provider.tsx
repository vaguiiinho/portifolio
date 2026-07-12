"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react"
import {
  fetchCurrentUser,
  login as loginRequest,
  logout as logoutRequest,
  type AuthUser,
  type LoginPayload,
} from "@/lib/api"

interface AuthContextValue {
  user: AuthUser | null
  isLoading: boolean
  isAuthenticated: boolean
  authErrorStatus: number | null
  login: (payload: LoginPayload) => Promise<AuthUser>
  logout: () => Promise<void>
  refreshSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

function normalizeUser(
  user: AuthUser | { sub: string; email: string; role: AuthUser["role"] },
): AuthUser {
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
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [authErrorStatus, setAuthErrorStatus] = useState<number | null>(null)

  useEffect(() => {
    function handleAuthError(event: Event) {
      const customEvent = event as CustomEvent<{ status?: number }>
      const status = customEvent.detail?.status

      if (status !== 401 && status !== 403) {
        return
      }

      setAuthErrorStatus(status)

      // A 403 can mean insufficient permissions (or an origin/CSRF rejection),
      // not an expired session. Retrying logout after such a response emits the
      // same auth-error event and creates a request loop.
      if (status === 401) {
        setUser(null)
        void logoutRequest()
      }
    }

    window.addEventListener("portfolio:auth-error", handleAuthError)

    return () => {
      window.removeEventListener("portfolio:auth-error", handleAuthError)
    }
  }, [])

  async function refreshStoredSession() {
    try {
      const currentUser = await fetchCurrentUser()
      setUser(normalizeUser(currentUser))
    } catch {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleLogin(payload: LoginPayload) {
    const session = await loginRequest(payload)

    setAuthErrorStatus(null)
    setUser(normalizeUser(session.user))

    return normalizeUser(session.user)
  }

  async function logout() {
    await logoutRequest().catch(() => undefined)
    setUser(null)
    setAuthErrorStatus(null)
  }

  const refreshSession = useCallback(async () => {
    await refreshStoredSession()
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void refreshSession()
    }, 0)

    return () => window.clearTimeout(timer)
  }, [refreshSession])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: Boolean(user),
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
