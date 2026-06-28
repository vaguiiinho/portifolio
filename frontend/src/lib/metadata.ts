import { siteDefaults } from "./site-config"

interface RouteMetadataInput {
  siteName?: string
  title: string
  description: string
  path: string
}

export function createRouteMetadata({ siteName, title, description, path }: RouteMetadataInput) {
  const resolvedSiteName = siteName || siteDefaults.siteName

  return {
    title: `${resolvedSiteName} | ${title}`,
    description,
    alternates: {
      canonical: `https://${siteDefaults.domain}${path}`,
    },
  }
}
