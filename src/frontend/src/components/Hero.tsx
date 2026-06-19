interface HeroProps {
  onSelectMode: (mode: 'ai' | 'constructor') => void
}

export default function Hero({ onSelectMode }: HeroProps) {
  return (
    <section className="bg-gradient-to-br from-brand-600 to-brand-700 text-white py-20 px-4">
      <div className="container mx-auto text-center max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Ваш AI-помощник<br />для идеального путешествия
        </h1>
        <p className="text-xl text-blue-100 mb-12">
          Подберём туры, авиабилеты и отели под ваши желания и бюджет
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <button
            onClick={() => onSelectMode('ai')}
            className="bg-white text-brand-700 rounded-2xl p-6 text-left hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
          >
            <div className="text-3xl mb-3">🤖</div>
            <h3 className="text-lg font-bold mb-2">AI-помощник</h3>
            <p className="text-slate-500 text-sm">
              Опишите, куда хотите поехать — AI подберёт лучшие варианты за вас
            </p>
          </button>

          <button
            onClick={() => onSelectMode('constructor')}
            className="bg-white text-brand-700 rounded-2xl p-6 text-left hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
          >
            <div className="text-3xl mb-3">🗺️</div>
            <h3 className="text-lg font-bold mb-2">Конструктор</h3>
            <p className="text-slate-500 text-sm">
              Сами выберите направление, отель, авиабилеты и экскурсии
            </p>
          </button>
        </div>
      </div>
    </section>
  )
}
