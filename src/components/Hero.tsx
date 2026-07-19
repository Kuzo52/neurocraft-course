import { motion } from 'framer-motion'
import { useSmoothScroll } from '../hooks/useSmoothScroll'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.12 + i * 0.1,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
}

export function Hero() {
  const scrollTo = useSmoothScroll()

  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center overflow-hidden safe-px pb-20 pt-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 70% 20%, rgb(204 255 0 / 0.14), transparent 55%), radial-gradient(ellipse 55% 45% at 15% 80%, rgb(56 100 255 / 0.18), transparent 50%), radial-gradient(circle at 50% 50%, rgb(17 24 39 / 0.2), transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgb(255 255 255 / 0.03) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black, transparent)',
        }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-5 font-display text-sm font-semibold uppercase tracking-[0.22em] text-lime"
          >
            NeuroCraft
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="font-display text-[clamp(2.4rem,6vw,4.75rem)] font-bold leading-[1.05] tracking-[-0.03em]"
          >
            <span className="text-gradient">Нейросети для&nbsp;коммерческих дизайнеров</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-xl text-[17px] leading-relaxed text-mist md:text-lg"
          >
            Научитесь собирать продающий визуал быстрее рынка: от чернового скетча до готового
            коммерческого арта с&nbsp;нейросетями.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <motion.button
              type="button"
              onClick={() => scrollTo('register')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden rounded-[14px] bg-lime px-7 py-4 text-[15px] font-bold text-cobalt"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 animate-pulse rounded-[14px] bg-lime/40 blur-xl"
              />
              <span className="relative">Занять место</span>
            </motion.button>

            <button
              type="button"
              onClick={() => scrollTo('program')}
              className="rounded-[14px] border border-white/15 bg-white/5 px-6 py-4 text-[15px] font-semibold text-ink backdrop-blur-md transition-transform duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-white/10 active:scale-[0.97]"
            >
              Смотреть программу
            </button>
          </motion.div>
        </div>

        <motion.aside
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="glow-lime overflow-hidden rounded-[24px] border border-lime/30 bg-cobalt-elevated/80">
            <img
              src="https://loremflickr.com/960/720/ai,design,studio"
              alt="Коммерческий визуал, созданный с помощью нейросетей"
              width={960}
              height={720}
              className="aspect-[4/3] w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <div className="glass-panel absolute -bottom-5 left-4 right-4 rounded-[16px] px-4 py-3 md:left-8 md:right-auto md:max-w-xs">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-lime">Формат</p>
            <p className="mt-1 text-sm font-semibold text-ink">
              Практика · промпт-системы · коммерческие кейсы
            </p>
          </div>
        </motion.aside>
      </div>
    </section>
  )
}
