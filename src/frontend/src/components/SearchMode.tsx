'use client'

import { useState, useEffect } from 'react'

const TABS = [
  { id: 'tours', label: '🌴 Туры' },
  { id: 'flights', label: '✈️ Авиабилеты' },
  { id: 'hotels', label: '🏨 Отели' },
  { id: 'excursions', label: '🎭 Экскурсии' },
]

const MARKER = '540808'
const SLETAT_MODULE_ID = '60680718-226c-4013-9659-1a3279d05421'

export default function SearchMode() {
  const [tab, setTab] = useState('tours')
  const [sletatLoaded, setSletatLoaded] = useState(false)

  useEffect(() => {
    if (tab === 'tours' && !sletatLoaded) {
      const existing = document.querySelector('script[src*="sletat.ru"]')
      if (!existing) {
        const script = document.createElement('script')
        script.src = 'https://front.sletat.ru/modules/module6/latest/module.js'
        script.charset = 'utf-8'
        script.async = true
        document.body.appendChild(script)
      }
      setSletatLoaded(true)
    }
  }, [tab, sletatLoaded])

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Конструктор путешествия</h2>

      <div className="flex gap-2 mb-6 flex-wrap">
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
        {tab === 'tours' && (
          <div>
            <div
              data-sletat-module-id={SLETAT_MODULE_ID}
              style={{ minHeight: 320 }}
            />
          </div>
        )}

        {tab === 'flights' && (
          <div>
            <h3 className="font-semibold text-slate-700 mb-4">Поиск авиабилетов</h3>
            <p className="text-sm text-slate-500 mb-6">
              Сравниваем цены Aviasales, S7, Аэрофлот и 100+ авиакомпаний
            </p>
            <a
              href={`https://www.aviasales.ru/?marker=${MARKER}`}
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
              href={`https://www.hotellook.ru/?marker=${MARKER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-brand-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-700 transition-colors"
            >
              Найти отель →
            </a>
          </div>
        )}

        {tab === 'excursions' && (
          <div>
            <h3 className="font-semibold text-slate-700 mb-4">Экскурсии по всему миру</h3>
            <p className="text-sm text-slate-500 mb-6">
              Более 60 000 экскурсий и активностей через GetYourGuide и Viator
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                { name: '🏛️ Экскурсии в Европе', href: `https://www.getyourguide.ru/?partner_id=NOVA&utm_medium=referral` },
                { name: '🌊 Туры в Азии', href: `https://www.getyourguide.ru/asia/?partner_id=NOVA&utm_medium=referral` },
                { name: '🏖️ Экскурсии в Турции', href: `https://www.viator.com/Turkey/d95-ttd?pid=P00152710&mcid=42383&medium=link` },
                { name: '🗼 Экскурсии в ОАЭ', href: `https://www.viator.com/Dubai/d828-ttd?pid=P00152710&mcid=42383&medium=link` },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border border-slate-200 rounded-xl p-4 hover:border-brand-400 hover:bg-brand-50 transition-colors text-sm font-medium text-slate-700"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <a
              href={`https://www.getyourguide.ru/?partner_id=NOVA&utm_medium=referral`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-brand-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-700 transition-colors"
            >
              Все экскурсии →
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
