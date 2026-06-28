"use client"

import { useState } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { Menu, X, Moon, Sun, LogIn, LogOut } from "lucide-react"
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
}

export function Navbar({ siteName, locale }: NavbarProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useMobileMenu()
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, isAuthenticated, logout, isLoading } = useAuth()
  const router = useRouter()
  const { scrollY } = useScroll()
  const shellCtaContent = getShellCtaContent(locale)

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 0)
  })

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  function handleLogout() {
    logout()
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

          <DesktopNav locale={locale} />

          {/* Actions */}
          <div className="flex items-center gap-3">
            <LocaleToggle locale={locale} />
            {!isLoading &&
              (isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <div className="hidden lg:flex flex-col text-right leading-tight">
                    <span className="text-xs text-muted-foreground">Admin</span>
                    <span className="text-xs font-medium">{user?.email}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="rounded-full"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline">Sair</span>
                  </Button>
                </div>
              ) : (
                <Button
                  as="a"
                  href={portfolioRoutes.login}
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                >
                  <LogIn className="h-4 w-4" />
                  Admin
                </Button>
              ))}
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
              className="hidden sm:inline-flex rounded-full"
              metricKey="cta:navbar-primary"
            >
              {shellCtaContent.navbar.primaryLabel}
            </Button>

            <Button
              as="a"
              href={shellCtaContent.navbar.secondaryHref}
              variant="outline"
              className="hidden lg:inline-flex rounded-full"
              metricKey="cta:navbar-secondary"
            >
              {shellCtaContent.navbar.secondaryLabel}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        <MobileNav isOpen={isMobileMenuOpen} onClose={closeMobileMenu} locale={locale} />
      </Container>
    </motion.header>
  )
}
