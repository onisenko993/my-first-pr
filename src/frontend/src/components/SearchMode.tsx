'use client'

import { useState } from 'react'

const TABS = [
  { id: 'flights', label: '✈️ Авиабилеты' },
  { id: 'hotels', label: '🏨 Отели' },
  { id: 'tours', label: '🌴 Туры' },
]

export default function SearchMode() {
  const [tab, setTab] = useState('flights')

  const marker = '540808'

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Конструктор путешествия</h2>

      <div className="flex gap-2 mb-6">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t.id
                ? 'bg-brand-600 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-400'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        {tab === 'flights' && (
          <div>
            <h3 className="font-semibold text-slate-700 mb-4">Поиск авиабилетов</h3>
            <p className="text-sm text-slate-500 mb-6">
              Сравниваем цены Aviasales, S7, Аэрофлот и 100+ авиакомпаний
            </p>
            <a
              href={`https://www.aviasales.ru/?marker=${marker}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-brand-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-700 transition-colors"
            >
              Найти авиабилеты →
            </a>
          </div>
        )}
        {tab === 'hotels' && (
          <div>
            <h3 className="font-semibold text-slate-700 mb-4">Поиск отелей</h3>
            <p className="text-sm text-slate-500 mb-6">
              Hotellook — более 2 000 000 отелей по всему миру
            </p>
            <a
              href={`https://www.hotellook.ru/?marker=${marker}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-brand-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-700 transition-colors"
            >
              Найти отель →
            </a>
          </div>
        )}
        {tab === 'tours' && (
          <div>
            <h3 className="font-semibold text-slate-700 mb-4">Поиск туров</h3>
            <p className="text-sm text-slate-500 mb-6">
              Туры от ведущих туроператоров: Coral Travel, Pegas, TUI и других
            </p>
            <a
              href={`https://tours.aviasales.ru/?marker=${marker}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-brand-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-700 transition-colors"
            >
              Найти тур →
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
