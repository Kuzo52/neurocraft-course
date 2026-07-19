import { motion } from 'framer-motion'

const REVIEWS = [
  {
    name: 'Алина К.',
    role: 'Бренд-дизайнер',
    text: 'За две недели собрала портфолио из коммерческих кейсов. Клиенты сами спрашивают, как я так ускорилась.',
  },
  {
    name: 'Марк С.',
    role: 'Контент-креатор',
    text: 'Промпт-система курса закрыла хаос. Теперь серия визуалов для Reels выходит за вечер, а не за неделю.',
  },
  {
    name: 'Ева Р.',
    role: 'Арт-директор',
    text: 'Наконец понятный пайплайн: скетч → генерация → доводка. Без воды, только рабочие приёмы под брифы.',
  },
] as const

export function Reviews() {
  return (
    <section id="reviews" className="safe-px relative py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 max-w-2xl"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-lime">
            Отзывы
          </p>
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.75rem)] font-bold tracking-tight text-ink">
            Что говорят выпускники
          </h2>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {REVIEWS.map((review, index) => (
            <motion.blockquote
              key={review.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: index * 0.08,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
              className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6"
            >
              <p className="text-[15px] leading-relaxed text-mist">«{review.text}»</p>
              <footer className="mt-6">
                <p className="font-semibold text-ink">{review.name}</p>
                <p className="mt-0.5 text-sm text-mist">{review.role}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
