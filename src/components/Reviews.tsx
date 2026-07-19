import { motion } from 'framer-motion'

const REVIEWS = [
  {
    name: 'Алина К.',
    role: 'Бренд-дизайнер',
    text: 'За две недели собрала портфолио из коммерческих кейсов. Клиенты сами спрашивают, как я так ускорилась.',
    avatar: 'https://loremflickr.com/160/160/portrait,woman',
  },
  {
    name: 'Марк С.',
    role: 'Контент-креатор',
    text: 'Промпт-система курса закрыла хаос. Теперь серия визуалов для Reels выходит за вечер, а не за неделю.',
    avatar: 'https://loremflickr.com/160/160/portrait,man',
  },
  {
    name: 'Ева Р.',
    role: 'Арт-директор',
    text: 'Наконец понятный пайплайн: скетч → генерация → доводка. Без воды, только рабочие приёмы под брифы.',
    avatar: 'https://loremflickr.com/160/160/portrait,girl',
  },
] as const

export function Reviews() {
  return (
    <section id="reviews" className="safe-px relative py-12 md:py-24 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/3 h-64 bg-[radial-gradient(ellipse_at_center,rgb(204_255_0_/0.06),transparent_65%)]"
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
              className="glass-panel flex h-full flex-col rounded-[24px] p-6"
            >
              <p className="flex-1 text-[15px] leading-relaxed text-mist">«{review.text}»</p>
              <footer className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                <img
                  src={review.avatar}
                  alt={review.name}
                  width={44}
                  height={44}
                  loading="lazy"
                  className="h-11 w-11 rounded-full object-cover ring-2 ring-lime/40"
                />
                <div>
                  <p className="font-semibold text-ink">{review.name}</p>
                  <p className="mt-0.5 text-sm text-mist">{review.role}</p>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
