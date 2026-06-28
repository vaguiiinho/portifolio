"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { useAuth } from "./auth-provider"
import { portfolioRoutes } from "@/lib/routes"
import type { Locale } from "@/lib/locale"

interface LoginFormProps {
  locale: Locale
}

export function LoginForm({ locale }: LoginFormProps) {
  const router = useRouter()
  const { login, isAuthenticated, isLoading, user, authErrorStatus } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      setIsSubmitting(true)
      setError(null)
      await login({ email, password })
      router.push(portfolioRoutes.admin)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : locale === "en" ? "Failed to sign in" : "Falha ao entrar")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isLoading && isAuthenticated) {
    return (
      <div className="space-y-4 rounded-3xl border border-border bg-card/90 p-8 shadow-xl backdrop-blur">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-emerald-500" />
          <div>
            <h1 className="text-2xl font-semibold">{locale === "en" ? "Admin session active" : "Sessão de admin ativa"}</h1>
            <p className="text-sm text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </div>

        <Button as="a" href={portfolioRoutes.admin} className="rounded-full">
          {locale === "en" ? "Go to dashboard" : "Ir para o painel"}
        </Button>
      </div>
    )
  }

  const authNotice =
    authErrorStatus === 401
      ? locale === "en"
        ? "Your session expired. Sign in again to continue."
        : "Sua sessão expirou. Entre novamente para continuar."
      : authErrorStatus === 403
        ? locale === "en"
          ? "Your session no longer has permission. Sign in again."
          : "Sua sessão não tem mais permissão. Entre novamente."
        : null

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-border bg-card/90 p-8 shadow-xl backdrop-blur">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/70 px-3 py-1 text-xs font-medium text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5" />
          {locale === "en" ? "Administrator access" : "Acesso administrativo"}
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">
          {locale === "en" ? "Sign in to manage content" : "Entre para gerenciar o conteúdo"}
        </h1>
        <p className="max-w-lg text-sm text-muted-foreground">
          {locale === "en"
            ? "Use your administrator account to create, edit and delete projects."
            : "Use sua conta de administrador para criar, editar e excluir projetos."}
        </p>
      </div>

      {authNotice && (
        <p className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-300">
          {authNotice}
        </p>
      )}

      <div className="grid gap-4">
        <FormField
          id="admin-email"
          name="email"
          type="email"
          label={locale === "en" ? "Email" : "Email"}
          placeholder="admin@portfolio.local"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <FormField
          id="admin-password"
          name="password"
          type="password"
          label={locale === "en" ? "Password" : "Senha"}
          placeholder={locale === "en" ? "Your password" : "Sua senha"}
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      {error && (
        <p className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <Button type="submit" className="w-full rounded-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {locale === "en" ? "Sign in" : "Entrar"}
      </Button>
    </form>
  )
}
