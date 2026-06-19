'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import SearchMode from '@/components/SearchMode'
import AIChat from '@/components/AIChat'
import Features from '@/components/Features'
import Footer from '@/components/Footer'

export default function Home() {
  const [mode, setMode] = useState<'ai' | 'constructor' | null>(null)

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      {!mode && <Hero onSelectMode={setMode} />}
      {mode && (
        <div className="flex-1 container mx-auto px-4 py-8">
          <button
            onClick={() => setMode(null)}
            className="mb-6 text-brand-600 hover:text-brand-700 flex items-center gap-2 text-sm font-medium"
          >
            ← Назад
          </button>
          {mode === 'ai' && <AIChat />}
          {mode === 'constructor' && <SearchMode />}
        </div>
      )}
      {!mode && <Features />}
      <Footer />
    </main>
  )
}
