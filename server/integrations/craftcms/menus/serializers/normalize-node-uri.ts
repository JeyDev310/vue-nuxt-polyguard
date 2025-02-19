import { withLeadingSlash } from 'ufo'

export function normalizeNodeUri(
  url: string | null | undefined,
): string | undefined {
  if (url === null || url === undefined) {
    return undefined
  }

  const protocols = ['http://', 'https://', 'mailto:', 'tel:', 'sms:', 'ftp://']
  if (protocols.some((protocol) => url.startsWith(protocol))) {
    return url
  }

  return withLeadingSlash(url)
}
