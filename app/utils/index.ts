import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isLinkExternal({
  url,
  primaryDomainUrl,
  publicStoreDomain,
}: {
  url: string
  primaryDomainUrl: string
  publicStoreDomain: string
}): boolean {
  const segment =
    url.includes('myshopify.com') ||
      url.includes(publicStoreDomain) ||
      url.includes(primaryDomainUrl)
      ? new URL(url).pathname
      : url
  const isExternal = !segment.startsWith('/')

  return isExternal
}