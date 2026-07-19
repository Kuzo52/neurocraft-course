import { useEffect, useState } from 'react'

export type CountdownParts = {
  hours: string
  minutes: string
  seconds: string
}

const pad = (value: number): string => String(Math.max(0, value)).padStart(2, '0')

const toParts = (totalMs: number): CountdownParts => {
  const totalSeconds = Math.max(0, Math.floor(totalMs / 1000))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return {
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
  }
}

export function useCountdown(durationMs: number): CountdownParts {
  const [remaining, setRemaining] = useState(durationMs)

  useEffect(() => {
    const startedAt = Date.now()
    const tick = () => {
      const elapsed = Date.now() - startedAt
      setRemaining(Math.max(0, durationMs - elapsed))
    }

    tick()
    const id = window.setInterval(tick, 250)
    return () => window.clearInterval(id)
  }, [durationMs])

  return toParts(remaining)
}
