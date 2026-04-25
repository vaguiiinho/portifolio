"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu, X, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "./container"
import { cn } from "@/lib/utils"
import { useTheme } from "./use-theme"
import { useMobileMenu } from "./use-mobile-menu"
import { DesktopNav } from "./desktop-nav"
import { MobileNav } from "./mobile-nav"
import { siteConfig } from "@/data/site"

export function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useMobileMenu()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
          <a href="#home" className="text-xl font-bold tracking-tight">
            {siteConfig.name}
          </a>

          <DesktopNav />

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <Button as="a" href="#projects" className="hidden sm:inline-flex rounded-full">
              View Projects
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

        <MobileNav isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
      </Container>
    </motion.header>
  )
}
