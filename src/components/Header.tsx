import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { useSmoothScroll } from '../hooks/useSmoothScroll'

const NAV = [
  { id: 'program', label: 'Программа' },
  { id: 'pricing', label: 'Тарифы' },
  { id: 'reviews', label: 'Отзывы' },
] as const

export function Header() {
  const scrollTo = useSmoothScroll()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 12)
  })

  const go = (id: string) => {
    setOpen(false)
    scrollTo(id)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 safe-px pt-[max(0.75rem,env(safe-area-inset-top))]">
      <motion.div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-[20px] px-4 py-3 transition-[background,border,box-shadow] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] md:px-5 ${
          scrolled
            ? 'glass-panel shadow-[0_10px_40px_rgb(0_0_0_/0.35)]'
            : 'border border-transparent bg-transparent'
        }`}
      >
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault()
            go('hero')
          }}
          className="flex items-center gap-2.5 font-display text-[17px] font-semibold tracking-tight text-ink"
        >
          <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-lime text-cobalt">
            <span className="h-2.5 w-2.5 rounded-full bg-cobalt" />
          </span>
          NeuroCraft
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Основная навигация">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault()
                go(item.id)
              }}
              className="rounded-[12px] px-3.5 py-2 text-[14px] font-medium text-mist transition-colors duration-200 hover:bg-white/5 hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => go('register')}
            className="rounded-[12px] bg-lime px-4 py-2.5 text-[13px] font-semibold text-cobalt shadow-[0_0_24px_rgb(204_255_0_/0.25)]"
          >
            Записаться
          </motion.button>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-[12px] border border-white/10 text-ink md:hidden"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3.5 w-4">
              <span
                className={`absolute left-0 h-0.5 w-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  open ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-full bg-current transition-opacity duration-200 ${
                  open ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  open ? 'top-1.5 -rotate-45' : 'top-3'
                }`}
              />
            </span>
          </button>
        </div>
      </motion.div>

      {open ? (
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-[20px] p-3 md:hidden"
          aria-label="Мобильная навигация"
        >
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault()
                go(item.id)
              }}
              className="rounded-[12px] px-4 py-3 text-[15px] font-medium text-ink hover:bg-white/5"
            >
              {item.label}
            </a>
          ))}
        </motion.nav>
      ) : null}
    </header>
  )
}
