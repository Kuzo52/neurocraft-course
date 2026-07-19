import { motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

const BEFORE_SRC = 'https://loremflickr.com/1200/800/sketch,drawing,pencil'
const AFTER_SRC = 'https://loremflickr.com/1200/800/digital,art,illustration'

export function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(52)
  const dragging = useRef(false)

  const updateFromClientX = useCallback((clientX: number) => {
    const node = containerRef.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    if (rect.width <= 0) return
    const next = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(96, Math.max(4, next)))
  }, [])

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (!dragging.current) return
      updateFromClientX(event.clientX)
    }
    const onUp = () => {
      dragging.current = false
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [updateFromClientX])

  return (
    <section id="compare" className="safe-px relative py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 max-w-2xl"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-lime">
            До / После
          </p>
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.75rem)] font-bold tracking-tight text-ink">
            От скетча до&nbsp;коммерческого арта
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-mist">
            Потяните ползунок и&nbsp;сравните черновик с&nbsp;готовым визуалом, собранным через
            нейросетевой пайплайн курса.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          ref={containerRef}
          className="relative aspect-[3/2] select-none overflow-hidden rounded-[24px] border border-white/10 bg-cobalt-elevated touch-none"
          onPointerDown={(event) => {
            dragging.current = true
            event.currentTarget.setPointerCapture?.(event.pointerId)
            updateFromClientX(event.clientX)
          }}
        >
          <img
            src={AFTER_SRC}
            alt="Готовый коммерческий арт"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            draggable={false}
          />

          <img
            src={BEFORE_SRC}
            alt="Черновой скетч"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            loading="lazy"
            draggable={false}
          />

          <div
            className="absolute inset-y-0 z-10 w-0.5 bg-lime shadow-[0_0_18px_rgb(204_255_0_/0.7)]"
            style={{ left: `${position}%` }}
          >
            <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-lime/70 bg-cobalt/90 text-lime backdrop-blur-md">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M8 7L3 12L8 17M16 7L21 12L16 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <span className="absolute left-4 top-4 rounded-[10px] bg-cobalt/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-mist backdrop-blur-md">
            До
          </span>
          <span className="absolute right-4 top-4 rounded-[10px] bg-lime/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-cobalt">
            После
          </span>

          <input
            type="range"
            min={4}
            max={96}
            value={position}
            aria-label="Сравнить до и после"
            className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
            onChange={(event) => setPosition(Number(event.target.value))}
          />
        </motion.div>
      </div>
    </section>
  )
}
