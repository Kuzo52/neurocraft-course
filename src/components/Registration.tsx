import { useMemo, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { useCountdown } from '../hooks/useCountdown'
import { Modal } from './Modal'

type FormState = {
  name: string
  phone: string
  telegram: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const INITIAL: FormState = {
  name: '',
  phone: '',
  telegram: '',
}

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {}
  const name = values.name.trim()
  const phone = values.phone.trim()
  const telegram = values.telegram.trim().replace(/^@+/, '')

  if (!name) {
    errors.name = 'Укажите имя'
  } else if (name.length < 2) {
    errors.name = 'Имя слишком короткое'
  }

  const digits = phone.replace(/\D/g, '')
  if (!phone) {
    errors.phone = 'Укажите телефон'
  } else if (digits.length < 10 || digits.length > 15) {
    errors.phone = 'Введите корректный номер телефона'
  }

  if (!telegram) {
    errors.telegram = 'Укажите username в Telegram'
  } else if (!/^[A-Za-z][A-Za-z0-9_]{4,31}$/.test(telegram)) {
    errors.telegram = 'Username: 5–32 символа, латиница, цифры и _'
  }

  return errors
}

export function Registration() {
  const countdown = useCountdown(1000 * 60 * 60 * 14 + 1000 * 60 * 37 + 1000 * 22)
  const [values, setValues] = useState<FormState>(INITIAL)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({})
  const [modalOpen, setModalOpen] = useState(false)

  const telegramDisplay = useMemo(() => {
    const raw = values.telegram.replace(/^@+/, '')
    return raw
  }, [values.telegram])

  const setField = (key: keyof FormState, value: string) => {
    setValues((prev) => {
      const next = { ...prev, [key]: value }
      if (touched[key]) {
        setErrors(validate(next))
      }
      return next
    })
  }

  const markTouched = (key: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [key]: true }))
    setValues((current) => {
      setErrors(validate(current))
      return current
    })
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setTouched({ name: true, phone: true, telegram: true })
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return
    setModalOpen(true)
  }

  return (
    <section id="register" className="safe-px relative py-24 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgb(204_255_0_/0.1),transparent_55%)]"
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[24px] border border-white/10 bg-white/[0.03] p-7 md:p-8"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lime">
            Регистрация
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.8rem,3.2vw,2.5rem)] font-bold tracking-tight text-ink">
            Скидка заканчивается через
          </h2>

          <div className="mt-8 grid grid-cols-3 gap-3">
            {[
              { label: 'Часы', value: countdown.hours },
              { label: 'Минуты', value: countdown.minutes },
              { label: 'Секунды', value: countdown.seconds },
            ].map((unit) => (
              <div
                key={unit.label}
                className="rounded-[16px] border border-lime/25 bg-cobalt/70 px-3 py-4 text-center"
              >
                <p className="font-display text-3xl font-bold tabular-nums text-lime md:text-4xl">
                  {unit.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-mist">{unit.label}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-[15px] leading-relaxed text-mist">
            Оставьте заявку — менеджер уточнит тариф и&nbsp;поможет выбрать удобный формат оплаты.
          </p>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          noValidate
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel rounded-[24px] p-7 md:p-8"
        >
          <h3 className="font-display text-xl font-semibold text-ink">Форма заявки</h3>
          <p className="mt-2 text-sm text-mist">Все поля обязательны для заполнения</p>

          <div className="mt-7 grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-ink">Имя</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                value={values.name}
                onChange={(e) => setField('name', e.target.value)}
                onBlur={() => markTouched('name')}
                className="rounded-[12px] border border-white/12 bg-cobalt/50 px-4 py-3.5 text-[15px] text-ink outline-none transition-[border,box-shadow] duration-200 placeholder:text-mist/60 focus:border-lime/60 focus:shadow-[0_0_0_3px_rgb(204_255_0_/0.15)]"
                placeholder="Как к вам обращаться"
              />
              {touched.name && errors.name ? (
                <span className="text-sm text-red-300">{errors.name}</span>
              ) : null}
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-ink">Телефон</span>
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                inputMode="tel"
                value={values.phone}
                onChange={(e) => setField('phone', e.target.value)}
                onBlur={() => markTouched('phone')}
                className="rounded-[12px] border border-white/12 bg-cobalt/50 px-4 py-3.5 text-[15px] text-ink outline-none transition-[border,box-shadow] duration-200 placeholder:text-mist/60 focus:border-lime/60 focus:shadow-[0_0_0_3px_rgb(204_255_0_/0.15)]"
                placeholder="+7 900 000-00-00"
              />
              {touched.phone && errors.phone ? (
                <span className="text-sm text-red-300">{errors.phone}</span>
              ) : null}
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-ink">Username в Telegram</span>
              <div className="flex overflow-hidden rounded-[12px] border border-white/12 bg-cobalt/50 transition-[border,box-shadow] duration-200 focus-within:border-lime/60 focus-within:shadow-[0_0_0_3px_rgb(204_255_0_/0.15)]">
                <span className="grid place-items-center border-r border-white/10 px-3.5 text-[15px] font-semibold text-lime">
                  @
                </span>
                <input
                  type="text"
                  name="telegram"
                  autoComplete="username"
                  value={telegramDisplay}
                  onChange={(e) => setField('telegram', e.target.value.replace(/^@+/, ''))}
                  onBlur={() => markTouched('telegram')}
                  className="w-full bg-transparent px-3 py-3.5 text-[15px] text-ink outline-none placeholder:text-mist/60"
                  placeholder="username"
                />
              </div>
              {touched.telegram && errors.telegram ? (
                <span className="text-sm text-red-300">{errors.telegram}</span>
              ) : null}
            </label>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 w-full rounded-[12px] bg-lime px-5 py-4 text-[15px] font-bold text-cobalt shadow-[0_0_28px_rgb(204_255_0_/0.28)]"
          >
            Оставить заявку
          </motion.button>
        </motion.form>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Спасибо за заявку!">
        В&nbsp;ближайшее время с&nbsp;вами свяжется наш менеджер для уточнения деталей.
      </Modal>
    </section>
  )
}
