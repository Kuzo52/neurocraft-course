import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, type ReactNode } from 'react'

type ModalProps = {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export function Modal({ open, onClose, title = 'Готово', children }: ModalProps) {
  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose, open])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        >
          <button
            type="button"
            aria-label="Закрыть модальное окно"
            className="absolute inset-0 bg-cobalt/70 backdrop-blur-xl"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="relative w-full max-w-md rounded-[24px] border border-white/10 bg-[#111827]/95 p-7 shadow-[0_24px_80px_rgb(0_0_0_/0.55)]"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[12px] bg-lime/15 text-lime">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M20 7L10.5 16.5L5 11"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h2 id="modal-title" className="font-display text-2xl font-semibold tracking-tight text-ink">
              {title}
            </h2>
            <div className="mt-3 text-[15px] leading-relaxed text-mist">{children}</div>

            <button
              type="button"
              onClick={onClose}
              className="mt-7 w-full rounded-[12px] bg-lime px-5 py-3.5 text-[15px] font-semibold text-cobalt transition-transform duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] hover:brightness-105 active:scale-[0.97]"
            >
              Закрыть
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
