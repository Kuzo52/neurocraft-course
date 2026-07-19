import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

type Module = {
  id: string
  title: string
  duration: string
  points: string[]
}

const MODULES: Module[] = [
  {
    id: 'm1',
    title: 'Основа коммерческого пайплайна',
    duration: 'Модуль 1 · 4 урока',
    points: [
      'Как нейросети встраиваются в реальный бриф',
      'Выбор инструментов под задачу и бюджет',
      'Сбор референсов и контроль визуального стиля',
    ],
  },
  {
    id: 'm2',
    title: 'Промпт-системы для дизайна',
    duration: 'Модуль 2 · 5 уроков',
    points: [
      'Структура промпта: объект, свет, материал, композиция',
      'Негативные промпты и итерации без потери стиля',
      'Библиотека готовых шаблонов под рекламу и соцсети',
    ],
  },
  {
    id: 'm3',
    title: 'От скетча до финального арта',
    duration: 'Модуль 3 · 6 уроков',
    points: [
      'Перевод черновика в нейрогенерацию',
      'Апскейл, ретушь и коммерческая доводка',
      'Сборка кейса, который продаёт услуги',
    ],
  },
  {
    id: 'm4',
    title: 'Контент и монетизация',
    duration: 'Модуль 4 · 4 урока',
    points: [
      'Серии визуалов для брендов и личных проектов',
      'Упаковка оффера и презентация результата клиенту',
      'Скорость производства без выгорания',
    ],
  },
]

function AccordionItem({
  module,
  open,
  onToggle,
}: {
  module: Module
  open: boolean
  onToggle: () => void
}) {
  return (
    <article className="overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.03]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors duration-200 hover:bg-white/[0.04] md:px-6"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lime">
            {module.duration}
          </p>
          <h3 className="mt-1.5 font-display text-lg font-semibold tracking-tight text-ink md:text-xl">
            {module.title}
          </h3>
        </div>

        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] border border-white/10 bg-cobalt/60 text-lime"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <ul className="space-y-3 border-t border-white/10 px-5 pb-6 pt-4 text-[15px] leading-relaxed text-mist md:px-6">
              {module.points.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  )
}

export function Program() {
  const [openId, setOpenId] = useState<string>(MODULES[0].id)

  return (
    <section id="program" className="safe-px relative py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 max-w-2xl"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-lime">
            Программа
          </p>
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.75rem)] font-bold tracking-tight text-ink">
            Четыре модуля до&nbsp;уверенного коммерческого результата
          </h2>
        </motion.div>

        <div className="grid gap-3">
          {MODULES.map((module) => (
            <AccordionItem
              key={module.id}
              module={module}
              open={openId === module.id}
              onToggle={() => setOpenId((prev) => (prev === module.id ? '' : module.id))}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
