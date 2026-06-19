import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Nova Horizon — AI помощник для путешествий',
  description: 'Найдите лучшие туры, авиабилеты и отели с помощью искусственного интеллекта. Персональный AI-помощник для вашего идеального путешествия.',
  keywords: 'туры, авиабилеты, отели, AI, путешествия, novahorizon',
  openGraph: {
    title: 'Nova Horizon — AI помощник для путешествий',
    description: 'AI-подбор туров, авиабилетов и отелей',
    url: 'https://novahorizon.ru',
    siteName: 'Nova Horizon',
    locale: 'ru_RU',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
