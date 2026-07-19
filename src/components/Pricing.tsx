import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useAnimatedNumber } from '../hooks/useAnimatedNumber'
import { useSmoothScroll } from '../hooks/useSmoothScroll'

export type PlanId = 'start' | 'pro' | 'vip'

type Plan = {
  id: PlanId
  name: string
  full: number
  installment: number
  description: string
  features: string[]
  featured?: boolean
}

export const PLANS: Plan[] = [
  {
    id: 'start',
    name: 'Старт',
    full: 24900,
    installment: 8900,
    description: 'База промптов и практика для самостоятельного старта',
    features: ['Доступ к модулям 1–2', 'Шаблоны промптов', 'Чат поддержки'],
  },
  {
    id: 'pro',
    name: 'Профи',
    full: 39900,
    installment: 13900,
    description: 'Полный пайплайн от скетча до коммерческого арта',
    features: ['Все модули курса', 'Разборы работ', 'Библиотека кейсов'],
  },
  {
    id: 'vip',
    name: 'VIP',
    full: 69900,
    installment: 23900,
    description: 'Максимум скорости: личная обратная связь и разбор брифов',
    features: ['Всё из тарифа «Профи»', '4 личных созвона', 'Приоритетная проверка'],
    featured: true,
  },
]

function formatRub(value: number): string {
  return new Intl.NumberFormat('ru-RU').format(value)
}

function PriceCard({
  plan,
  mode,
  selected,
  onSelect,
}: {
  plan: Plan
  mode: 'full' | 'installment'
  selected: boolean
  onSelect: (id: PlanId) => void
}) {
  const target = mode === 'full' ? plan.full : plan.installment
  const animated = useAnimatedNumber(target)
  const highlighted = selected || Boolean(plan.featured)

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      animate={{
        boxShadow: selected
          ? '0 0 0 1px rgb(204 255 0 / 0.7), 0 0 32px rgb(204 255 0 / 0.35), 0 12px 40px rgb(0 0 0 / 0.35)'
          : plan.featured
            ? '0 0 0 1px rgb(204 255 0 / 0.55), 0 0 28px rgb(204 255 0 / 0.28), 0 12px 40px rgb(0 0 0 / 0.35)'
            : '0 0 0 1px rgb(255 255 255 / 0.1)',
      }}
      className={`relative flex h-full flex-col rounded-[24px] border p-5 transition-[border-color,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:p-7 ${
        selected
          ? 'border-lime bg-cobalt-elevated'
          : plan.featured
            ? 'border-lime/55 bg-cobalt-elevated'
            : 'border-white/10 bg-white/[0.03]'
      }`}
    >
      {plan.featured ? (
        <span className="absolute -top-3 left-6 rounded-full bg-lime px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-cobalt">
          Лучший выбор
        </span>
      ) : null}

      <h3 className="font-display text-2xl font-semibold text-ink">{plan.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-mist">{plan.description}</p>

      <div className="mt-5 md:mt-6">
        <p className="font-display text-4xl font-bold tracking-tight text-ink">
          {formatRub(animated)}&nbsp;₽
        </p>
        <p className="mt-1 text-sm text-mist">
          {mode === 'full' ? 'при полной оплате' : 'в месяц · 3 платежа'}
        </p>
      </div>

      <ul className="mt-5 flex-1 space-y-3 text-[15px] text-mist md:mt-6">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
            {feature}
          </li>
        ))}
      </ul>

      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={() => onSelect(plan.id)}
        aria-pressed={selected}
        className={`mt-6 rounded-[12px] px-5 py-3.5 text-[15px] font-semibold transition-[background-color,color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:mt-8 ${
          selected || highlighted
            ? 'bg-lime text-cobalt shadow-[0_0_24px_rgb(204_255_0_/0.28)]'
            : 'border border-white/15 bg-white/5 text-ink hover:bg-white/10'
        }`}
      >
        <motion.span
          key={selected ? 'selected' : 'idle'}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {selected ? 'Выбрано ✓' : 'Выбрать тариф'}
        </motion.span>
      </motion.button>
    </motion.article>
  )
}

type PricingProps = {
  selectedPlanId: PlanId | null
  onSelectPlan: (id: PlanId) => void
}

export function Pricing({ selectedPlanId, onSelectPlan }: PricingProps) {
  const [mode, setMode] = useState<'full' | 'installment'>('full')
  const scrollTo = useSmoothScroll()
  const scrollTimer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (scrollTimer.current !== null) {
        window.clearTimeout(scrollTimer.current)
      }
    }
  }, [])

  const handleSelect = (id: PlanId) => {
    onSelectPlan(id)

    if (scrollTimer.current !== null) {
      window.clearTimeout(scrollTimer.current)
    }

    scrollTimer.current = window.setTimeout(() => {
      scrollTo('register')
      scrollTimer.current = null
    }, 700)
  }

  return (
    <section id="pricing" className="safe-px relative py-12 md:py-24 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/3 h-64 bg-[radial-gradient(ellipse_at_center,rgb(204_255_0_/0.08),transparent_65%)]"
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between md:gap-6"
        >
          <div className="max-w-xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-lime md:mb-3">
              Тарифы
            </p>
            <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.75rem)] font-bold tracking-tight text-ink">
              Выберите формат оплаты
            </h2>
          </div>

          <div
            role="group"
            aria-label="Способ оплаты"
            className="inline-flex rounded-[14px] border border-white/10 bg-white/[0.04] p-1"
          >
            {(
              [
                { id: 'full', label: 'Полная оплата' },
                { id: 'installment', label: 'Рассрочка' },
              ] as const
            ).map((option) => {
              const active = mode === option.id
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setMode(option.id)}
                  className={`relative rounded-[12px] px-4 py-2.5 text-[13px] font-semibold transition-colors duration-200 ${
                    active ? 'text-cobalt' : 'text-mist hover:text-ink'
                  }`}
                >
                  {active ? (
                    <motion.span
                      layoutId="pricing-switch"
                      className="absolute inset-0 rounded-[12px] bg-lime"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  ) : null}
                  <span className="relative z-10">{option.label}</span>
                </button>
              )
            })}
          </div>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {PLANS.map((plan) => (
            <PriceCard
              key={plan.id}
              plan={plan}
              mode={mode}
              selected={selectedPlanId === plan.id}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
