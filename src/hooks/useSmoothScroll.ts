import { useCallback } from 'react'

export function useSmoothScroll() {
  return useCallback((targetId: string) => {
    try {
      const el = document.getElementById(targetId)
      if (!el) return
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } catch {
      const el = document.getElementById(targetId)
      el?.scrollIntoView()
    }
  }, [])
}
