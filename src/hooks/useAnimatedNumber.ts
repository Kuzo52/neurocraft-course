import { animate, useMotionValue, useMotionValueEvent } from 'framer-motion'
import { useEffect, useState } from 'react'

export function useAnimatedNumber(target: number, duration = 0.55): number {
  const motionValue = useMotionValue(target)
  const [display, setDisplay] = useState(target)

  useMotionValueEvent(motionValue, 'change', (latest) => {
    setDisplay(Math.round(latest))
  })

  useEffect(() => {
    const controls = animate(motionValue, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    })
    return () => controls.stop()
  }, [duration, motionValue, target])

  return display
}
