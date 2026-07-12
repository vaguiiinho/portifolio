"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { Menu, X, Moon, Sun, LogIn, LogOut, ChevronDown, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AppLink } from "@/components/ui/app-link"
import { Container } from "./container"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { useMobileMenu } from "./use-mobile-menu"
import { DesktopNav } from "./desktop-nav"
import { MobileNav } from "./mobile-nav"
import { LocaleToggle } from "./locale-toggle"
import type { Locale } from "@/lib/locale"
import { getShellCtaContent } from "@/lib/content/localized"
import { useAuth } from "@/components/auth/auth-provider"
import { portfolioRoutes } from "@/lib/routes"
import { useRouter } from "next/navigation"

interface NavbarProps {
  siteName: string
  locale: Locale
  showServices?: boolean
}

export function Navbar({ siteName, locale, showServices = true }: NavbarProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useMobileMenu()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const { user, isAuthenticated, logout, isLoading } = useAuth()
  const router = useRouter()
  const { scrollY } = useScroll()
  const shellCtaContent = getShellCtaContent(locale)

  useEffect(() => {
    if (!isUserMenuOpen) return

    function closeOnOutsideClick(event: PointerEvent) {
      if (!userMenuRef.current?.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsUserMenuOpen(false)
        document.getElementById("user-menu-trigger")?.focus()
      }
    }

    document.addEventListener("pointerdown", closeOnOutsideClick)
    document.addEventListener("keydown", closeOnEscape)
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick)
      document.removeEventListener("keydown", closeOnEscape)
    }
  }, [isUserMenuOpen])

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 0)
  })

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  function handleLogout() {
    setIsUserMenuOpen(false)
    void logout()
    router.push(portfolioRoutes.home)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border/50 shadow-sm"
          : "bg-transparent"
      )}
    >
      <Container>
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <AppLink href="/" className="text-xl font-bold tracking-tight">
            {siteName}
          </AppLink>

          <DesktopNav locale={locale} showServices={showServices} />

          {/* Actions */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <LocaleToggle locale={locale} />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <Button
              as="a"
              href={shellCtaContent.navbar.primaryHref}
              className="hidden shrink-0 whitespace-nowrap rounded-full px-3 sm:inline-flex"
              metricKey="cta:navbar-primary"
            >
              {shellCtaContent.navbar.primaryLabel}
            </Button>

            <Button
              as="a"
              href={shellCtaContent.navbar.secondaryHref}
              variant="outline"
              className="hidden shrink-0 whitespace-nowrap rounded-full px-3 lg:inline-flex"
              metricKey="cta:navbar-secondary"
            >
              {shellCtaContent.navbar.secondaryLabel}
            </Button>

            {!isLoading &&
              (isAuthenticated ? (
                <div ref={userMenuRef} className="relative">
                  <Button
                    id="user-menu-trigger"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsUserMenuOpen((isOpen) => !isOpen)}
                    className="max-w-48 rounded-full"
                    aria-expanded={isUserMenuOpen}
                    aria-haspopup="menu"
                    aria-controls="user-menu"
                  >
                    <UserRound className="h-4 w-4 shrink-0" />
                    <span className="hidden max-w-28 truncate sm:inline">
                      {user?.email}
                    </span>
                    <ChevronDown className="h-4 w-4 shrink-0" />
                  </Button>
                  {isUserMenuOpen && (
                    <div
                      id="user-menu"
                      role="menu"
                      className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-border bg-popover p-1 shadow-lg"
                    >
                      <div className="px-3 py-2">
                        <p className="text-xs text-muted-foreground">Administrador</p>
                        <p className="truncate text-sm font-medium">{user?.email}</p>
                      </div>
                      <div className="my-1 h-px bg-border" />
                      <button
                        type="button"
                        role="menuitem"
                        onClick={handleLogout}
                        onKeyDown={(event) => {
                          if (event.key === "Escape") {
                            event.preventDefault()
                            setIsUserMenuOpen(false)
                            document.getElementById("user-menu-trigger")?.focus()
                          }
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-destructive transition-colors hover:bg-destructive/10"
                      >
                        <LogOut className="h-4 w-4" />
                        Sair
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  as="a"
                  href={portfolioRoutes.admin}
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                >
                  <LogIn className="h-4 w-4" />
                  Entrar
                </Button>
              ))}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden shrink-0"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        <MobileNav isOpen={isMobileMenuOpen} onClose={closeMobileMenu} locale={locale} showServices={showServices} />
      </Container>
    </motion.header>
  )
}
