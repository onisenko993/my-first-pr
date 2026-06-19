export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌍</span>
          <span className="text-xl font-bold text-brand-600">Nova Horizon</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
          <a href="#features" className="hover:text-brand-600 transition-colors">Возможности</a>
          <a href="#how" className="hover:text-brand-600 transition-colors">Как это работает</a>
          <a href="https://t.me/NovaHorizonBot" target="_blank" rel="noopener noreferrer"
            className="bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors">
            Telegram-бот
          </a>
        </nav>
      </div>
    </header>
  )
}
