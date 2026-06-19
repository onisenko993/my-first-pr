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

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Привет! Я ваш AI-помощник по путешествиям. Опишите, куда хотите поехать, на сколько дней и какой у вас бюджет — я подберу лучшие варианты! ✈️',
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
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const res = await axios.post(`${apiUrl}/api/v1/ai/chat`, {
        messages: [...messages, userMsg],
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
                <span className="text-slate-400 text-sm">Подбираю варианты...</span>
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
