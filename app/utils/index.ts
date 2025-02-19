import { kebabCase } from 'scule'

/**
 * Converts a string to kebab-case format
 * @param str The string to convert (can be null or undefined)
 * @returns The kebab-cased string, or empty string if input is null/undefined
 * @example
 * toKebabCase('HelloWorld') // Returns 'hello-world'
 * toKebabCase('User Name') // Returns 'user-name'
 * toKebabCase(null) // Returns ''
 */
export function toKebabCase(str?: string | null): string {
  if (!str) return ''

  return kebabCase(str)
}

/**
 * Truncates text to a specified length, stripping HTML tags if present
 * @param text The text to truncate (can be HTML, plain text, null, or undefined)
 * @param length Maximum length of the output text (default: 100)
 * @returns Truncated text with ellipsis if needed
 */
export function truncate(
  text: string | null | undefined,
  length: number = 100,
): string {
  if (!text) return ''

  // Strip HTML tags
  const plainText = text.replace(/<[^>]*>/g, '')

  // If text is shorter than length, return as is
  if (plainText.length <= length) return plainText

  // Truncate and add ellipsis
  return plainText.slice(0, length).trim() + '...'
}
