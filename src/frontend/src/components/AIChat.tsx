'use client'

import { useState, useRef, useEffect } from 'react'
import axios from 'axios'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTIONS = [
  'Хочу отдохнуть на море в августе, бюджет 80 000 руб на двоих',
  'Подбери тур в Турцию на 7 ночей на троих',
  'Куда поехать на новогодние праздники?',
  'Хочу на экскурсию в Европу на 10 дней',
]

const CITY_MAP: Record<string, { iata: string; hotel: string }> = {
  турци: { iata: 'AYT', hotel: 'antalya' },
  анталь: { iata: 'AYT', hotel: 'antalya' },
  египет: { iata: 'SSH', hotel: 'sharm-el-sheikh' },
  шарм: { iata: 'SSH', hotel: 'sharm-el-sheikh' },
  дубай: { iata: 'DXB', hotel: 'dubai' },
  таиланд: { iata: 'BKK', hotel: 'phuket' },
  пхукет: { iata: 'HKT', hotel: 'phuket' },
  бали: { iata: 'DPS', hotel: 'bali' },
  мальдив: { iata: 'MLE', hotel: 'maldives' },
  грец: { iata: 'ATH', hotel: 'athens' },
  испани: { iata: 'BCN', hotel: 'barcelona' },
  сочи: { iata: 'AER', hotel: 'sochi' },
}

function detectDestination(text: string) {
  const lower = text.toLowerCase()
  for (const [key, val] of Object.entries(CITY_MAP)) {
    if (lower.includes(key)) return val
  }
  return null
}

function getNextMonth() {
  const d = new Date()
  d.setMonth(d.getMonth() + 2)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

function getCheckDates() {
  const checkIn = new Date()
  checkIn.setMonth(checkIn.getMonth() + 2)
  checkIn.setDate(1)
  const checkOut = new Date(checkIn)
  checkOut.setDate(checkIn.getDate() + 7)
  const fmt = (d: Date) => d.toISOString().split('T')[0]
  return { checkIn: fmt(checkIn), checkOut: fmt(checkOut) }
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Привет! Я ваш AI-помощник по путешествиям. Опишите, куда хотите поехать, на сколько дней и какой у вас бюджет — я подберу лучшие варианты с реальными ценами! ✈️',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return
    const userMsg: Message = { role: 'user', content: text }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const dest = detectDestination(text)

      let flight_context: string | undefined
      let hotel_context: string | undefined

      if (dest) {
        const { checkIn, checkOut } = getCheckDates()
        const month = getNextMonth()

        const [flightRes, hotelRes] = await Promise.allSettled([
          axios.get(`${apiUrl}/api/v1/search/flights`, {
            params: { origin: 'MOW', destination: dest.iata, depart_date: month },
          }),
          axios.get(`${apiUrl}/api/v1/search/hotels`, {
            params: { location: dest.hotel, check_in: checkIn, check_out: checkOut, adults: 2, limit: 3 },
          }),
        ])

        if (flightRes.status === 'fulfilled') {
          const data = flightRes.value.data
          const prices = Object.values(data?.data ?? {})
            .flatMap((v: unknown) => Object.values(v as Record<string, unknown>))
            .slice(0, 3)
            .map((t: unknown) => {
              const ticket = t as { price?: number; airline?: string; departure_at?: string }
              return `${ticket.airline ?? ''} — ${ticket.price ?? '?'} руб (вылет ${ticket.departure_at?.slice(0, 10) ?? '?'})`
            })
          if (prices.length > 0) flight_context = prices.join('\n')
        }

        if (hotelRes.status === 'fulfilled') {
          const hotels = hotelRes.value.data
          if (Array.isArray(hotels) && hotels.length > 0) {
            hotel_context = hotels
              .slice(0, 3)
              .map((h: { name?: string; stars?: number; priceFrom?: number }) =>
                `${h.name ?? 'Отель'} ${h.stars ? '⭐'.repeat(Math.min(h.stars, 5)) : ''} — от ${h.priceFrom ?? '?'} руб/ночь`
              )
              .join('\n')
          }
        }
      }

      const res = await axios.post(`${apiUrl}/api/v1/ai/chat`, {
        messages: newMessages,
        ...(flight_context && { flight_context }),
        ...(hotel_context && { hotel_context }),
      })
      setMessages(prev => [...prev, { role: 'assistant', content: res.data.response }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Извините, сервис временно недоступен. Попробуйте чуть позже или напишите нам в Telegram @NovaHorizonBot',
      }])
    }
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">AI-помощник по путешествиям</h2>

      <div className="bg-white rounded-2xl shadow-md flex flex-col h-[500px]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-brand-600 text-white rounded-br-sm'
                  : 'bg-slate-100 text-slate-800 rounded-bl-sm'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 rounded-2xl rounded-bl-sm px-4 py-3">
                <span className="text-slate-400 text-sm">Ищу актуальные цены...</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="border-t p-4">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
              placeholder="Опишите ваше путешествие..."
              className="flex-1 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              className="bg-brand-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-brand-700 disabled:opacity-40 transition-colors"
            >
              Отправить
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs text-slate-400 mb-2">Попробуйте спросить:</p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s, i) => (
            <button
              key={i}
              onClick={() => sendMessage(s)}
              className="text-xs bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full hover:border-brand-400 hover:text-brand-600 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
