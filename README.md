# Nova Horizon — AI Travel OS

**Платформа для поиска туров, бронирования отелей, авиабилетов и экскурсий с помощью искусственного интеллекта.**

- Сайт: [novahorizon.ru](http://novahorizon.ru)
- Компания: ООО «Нова Горизонт» (УСН 6%)
- Сервер: Timeweb Cloud (216.57.110.191)
- Партнёрская программа: [Travelpayouts](https://app.travelpayouts.com)

---

## Структура проекта

```
nova-horizon-ai-travel/
├── docs/               # Документация, дорожная карта, архитектура
├── team/               # Роли и инструкции AI-команды
├── src/
│   ├── frontend/       # Next.js сайт (novahorizon.ru)
│   ├── backend/        # FastAPI / Node.js API
│   ├── ai-agents/      # AI-агенты (CEO, Developer, Marketer и т.д.)
│   └── integrations/   # Travelpayouts, Aviasales, Hotellook API
├── infrastructure/     # Конфиг сервера Timeweb, nginx, docker
├── legal/              # Юридические документы, договоры
└── marketing/          # Контент-план, SMM, YouTube/TikTok/Instagram
```

## AI-команда

| Роль | Агент | Функция |
|------|-------|---------|
| CEO / Директор | `ai-ceo` | Стратегия, координация, связь с владельцем |
| Lead Developer | `ai-developer` | Архитектура, код, деплой |
| QA Engineer | `ai-tester` | Тестирование, мониторинг, устранение неполадок |
| Designer | `ai-designer` | UI/UX, брендинг, визуальный контент |
| Security Officer | `ai-security` | Безопасность, аудит, защита данных |
| Legal Officer | `ai-legal` | Юридические вопросы, договоры, соответствие |
| Chief Economist | `ai-economist` | Финансы, P&L, монетизация |
| Marketing Director | `ai-marketer` | SMM, контент, продвижение, SEO |

## Быстрый старт

```bash
git clone git@github.com:onisenko993/nova-horizon-ai-travel.git
cd nova-horizon-ai-travel
cp .env.example .env
# Заполните .env своими ключами API
docker-compose up -d
```

## Дорожная карта

Смотри [docs/ROADMAP.md](docs/ROADMAP.md)
