import { motion } from 'framer-motion'

const OUTCOMES = [
  {
    title: 'Ускорение работы',
    text: 'Собирайте коммерческие визуалы за часы, а не за дни — без потери качества и стиля бренда.',
    icon: (
      <path
        d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: 'Экономия бюджетов',
    text: 'Снижайте затраты на продакшн: один специалист закрывает задачи, которые раньше требовали команды.',
    icon: (
      <path
        d="M12 3v18M7 8h7.5a3.5 3.5 0 010 7H9a3.5 3.5 0 000 7H17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: 'Автоматизация рутины',
    text: 'Вынесите ресайзы, вариации и черновые итерации в нейросетевой пайплайн — оставьте за собой контроль.',
    icon: (
      <>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4l1.4-1.4M17 7l1.4-1.4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    title: 'Поднятие чека',
    text: 'Упаковывайте результат как премиальный сервис и поднимайте стоимость проектов на рынке.',
    icon: (
      <path
        d="M4 17l5-5 3.5 3.5L20 7M14 7h6v6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
] as const

export function Outcomes() {
  return (
    <section id="outcomes" className="safe-px relative py-12 md:py-24 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/4 h-56 bg-[radial-gradient(ellipse_at_center,rgb(204_255_0_/0.07),transparent_65%)]"
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 max-w-2xl md:mb-10"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-lime md:mb-3">
            Результат
          </p>
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.75rem)] font-bold tracking-tight text-ink">
            Что ты сможешь делать после курса
          </h2>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2 md:gap-4">
          {OUTCOMES.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                delay: index * 0.08,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md md:p-7"
            >
              <div className="mb-5 grid h-11 w-11 place-items-center rounded-[12px] border border-lime/30 bg-lime/10 text-lime">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  {item.icon}
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-mist">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
