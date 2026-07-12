import type { ReactNode } from "react"
import { Footer } from "./footer"
import { Navbar } from "./navbar"
import { MetricBeacon } from "./metric-beacon"
import type { Locale } from "@/lib/locale"

interface PortfolioRouteShellProps {
  siteName: string
  locale: Locale
  children: ReactNode
  pageMetricKey?: string
  showServices?: boolean
}

export function PortfolioRouteShell({ siteName, locale, children, pageMetricKey, showServices = true }: PortfolioRouteShellProps) {
  return (
    <main className="relative">
      {pageMetricKey && <MetricBeacon eventKey={pageMetricKey} />}
      <Navbar siteName={siteName} locale={locale} showServices={showServices} />
      {children}
      <Footer siteName={siteName} locale={locale} />
    </main>
  )
}
