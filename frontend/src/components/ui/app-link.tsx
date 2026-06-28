"use client"

import Link from "next/link"
import { trackStatsEvent } from "@/lib/analytics"

function isExternalHref(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href)
}

function isInternalRoute(href: string) {
  return href.startsWith("/") && !href.startsWith("//")
}

interface AppLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  metricKey?: string
}

export function AppLink({ href, target, rel, download, children, metricKey, onClick, ...props }: AppLinkProps) {
  const shouldUseAnchor = download || target === "_blank" || !isInternalRoute(href) || isExternalHref(href)
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    trackStatsEvent(metricKey ?? '')
    onClick?.(event)
  }

  if (!shouldUseAnchor) {
    return (
      <Link href={href} onClick={handleClick} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? rel ?? "noopener noreferrer" : rel}
      download={download}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  )
}
