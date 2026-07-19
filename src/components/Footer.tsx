export function Footer() {
  return (
    <footer className="safe-px safe-pb border-t border-white/10 py-6 md:py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-mist md:flex-row">
        <p>© {new Date().getFullYear()} NeuroCraft</p>
        <p>
          Made by{' '}
          <a
            href="https://t.me/kuzoceo"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-lime transition-opacity hover:opacity-80"
          >
            @kuzoceo
          </a>
        </p>
      </div>
    </footer>
  )
}
