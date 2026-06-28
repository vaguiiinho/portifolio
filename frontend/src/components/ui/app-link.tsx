import Link from "next/link"

function isExternalHref(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href)
}

function isInternalRoute(href: string) {
  return href.startsWith("/") && !href.startsWith("//")
}

interface AppLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
}

export function AppLink({ href, target, rel, download, children, ...props }: AppLinkProps) {
  const shouldUseAnchor = download || target === "_blank" || !isInternalRoute(href) || isExternalHref(href)

  if (!shouldUseAnchor) {
    return (
      <Link href={href} {...props}>
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
      {...props}
    >
      {children}
    </a>
  )
}
