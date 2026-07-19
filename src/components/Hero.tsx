import { motion } from 'framer-motion'
import { useSmoothScroll } from '../hooks/useSmoothScroll'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.1,
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
      className="relative flex min-h-svh items-center justify-center overflow-hidden safe-px pb-20 pt-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 30%, rgb(204 255 0 / 0.14), transparent 55%), radial-gradient(ellipse 55% 45% at 20% 80%, rgb(56 100 255 / 0.16), transparent 50%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage:
            'linear-gradient(rgb(255 255 255 / 0.03) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 40%, black, transparent)',
        }}
      />

      <div className="relative mx-auto w-full max-w-4xl text-center">
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
          className="font-display text-[clamp(2.5rem,7vw,4.85rem)] font-bold leading-[1.05] tracking-[-0.03em]"
        >
          <span className="text-gradient">Нейросети для&nbsp;коммерческих дизайнеров</span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-mist md:text-lg"
        >
          Научитесь собирать продающий визуал быстрее рынка: от чернового скетча до готового
          коммерческого арта с&nbsp;нейросетями.
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-10 flex justify-center"
        >
          <motion.button
            type="button"
            onClick={() => scrollTo('register')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="relative overflow-hidden rounded-[14px] bg-lime px-8 py-4 text-[15px] font-bold text-cobalt"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 animate-pulse rounded-[14px] bg-lime/40 blur-xl"
            />
            <span className="relative">Занять место</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
