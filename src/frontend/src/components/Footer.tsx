export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-10 px-4 mt-auto">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🌍</span>
              <span className="text-white font-bold">Nova Horizon</span>
            </div>
            <p className="text-sm">ООО «Нова Горизонт»</p>
            <p className="text-sm">novahorizon.ru</p>
          </div>
          <div className="text-sm space-y-2">
            <p className="text-white font-medium">Контакты</p>
            <a href="https://t.me/NovaHorizonBot" className="block hover:text-white transition-colors">
              Telegram-бот
            </a>
            <a href="mailto:info@novahorizon.ru" className="block hover:text-white transition-colors">
              info@novahorizon.ru
            </a>
          </div>
          <div className="text-sm space-y-2">
            <p className="text-white font-medium">Документы</p>
            <a href="/privacy" className="block hover:text-white transition-colors">
              Политика конфиденциальности
            </a>
            <a href="/terms" className="block hover:text-white transition-colors">
              Пользовательское соглашение
            </a>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-6 text-xs text-center">
          © 2025 Nova Horizon. Все права защищены. Работает на базе Travelpayouts.
        </div>
      </div>
    </footer>
  )
}
