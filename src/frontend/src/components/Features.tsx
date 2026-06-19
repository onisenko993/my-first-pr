const FEATURES = [
  {
    icon: '🤖',
    title: 'AI-подбор туров',
    desc: 'Просто опишите желания — AI найдёт лучшие варианты с учётом бюджета и дат',
  },
  {
    icon: '✈️',
    title: 'Дешевые авиабилеты',
    desc: 'Сравниваем цены 728 авиакомпаний и агрегаторов в реальном времени',
  },
  {
    icon: '🏨',
    title: '2 млн отелей',
    desc: 'Находим лучшую цену среди Booking, Hotels.com, Ostrovok и других',
  },
  {
    icon: '🗺️',
    title: 'Конструктор поездки',
    desc: 'Соберите поездку самостоятельно: авиа + отель + экскурсии',
  },
  {
    icon: '💰',
    title: 'Прогноз цен',
    desc: 'AI предсказывает когда лучше купить билет — покупайте в нужный момент',
  },
  {
    icon: '📱',
    title: 'Telegram-бот',
    desc: 'Подбирайте туры прямо в Telegram — быстро и удобно',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-4">
          Всё для вашего путешествия
        </h2>
        <p className="text-center text-slate-500 mb-12">
          Nova Horizon — единый AI-сервис для поиска и бронирования
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-50 hover:bg-brand-50 transition-colors">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-slate-800 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
