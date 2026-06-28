import type { ReactNode } from "react"
import { Footer } from "./footer"
import { Navbar } from "./navbar"

interface PortfolioRouteShellProps {
  siteName: string
  children: ReactNode
}

export function PortfolioRouteShell({ siteName, children }: PortfolioRouteShellProps) {
  return (
    <main className="relative">
      <Navbar siteName={siteName} />
      {children}
      <Footer siteName={siteName} />
    </main>
  )
}
