export function useCustomTailwind() {
  const pt = (value: number): string => {
    switch (value) {
      case 10.5:
        return 'pt-10.5'
      case 18:
        return 'pt-18'
      case 22:
        return 'pt-22'
      case 30:
        return 'pt-30'
      default:
        return `pt-${value}`
    }
  }
  const pb = (value: number): string => {
    switch (value) {
      case 10.5:
        return 'pb-10.5'
      case 18:
        return 'pb-18'
      case 22:
        return 'pb-22'
      case 30:
        return 'pb-30'
      default:
        return `pb-${value}`
    }
  }
  return {
    pt,
    pb,
  }
}
