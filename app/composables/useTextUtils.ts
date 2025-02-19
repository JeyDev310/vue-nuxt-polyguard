export function useTextUtils() {
  const readingTime = (content: string): string => {
    const wordCount = (text: string): number => {
      return text.split(/\s+/).length
    }
    const wordsPerMinute = 255
    const words = wordCount(content)
    const readingTimeMinutes = words / wordsPerMinute
    return Math.round(readingTimeMinutes) + ' min'
  }
  return {
    readingTime,
  }
}
