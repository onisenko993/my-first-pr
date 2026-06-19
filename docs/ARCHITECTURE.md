# Архитектура Nova Horizon

## Технический стек

### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI**: Tailwind CSS + shadcn/ui
- **State**: Zustand
- **Deploy**: Timeweb сервер (nginx)

### Backend
- **API**: FastAPI (Python 3.11)
- **База данных**: PostgreSQL 15
- **Кэш**: Redis
- **Очереди**: Celery + Redis
- **Deploy**: Docker + docker-compose

### AI / LLM
- **LLM**: Claude API (claude-sonnet-4-6 / claude-opus-4-8)
- **Оркестрация**: LangChain / LangGraph
- **Векторная БД**: Chroma / Pinecone
- **Поиск туров**: RAG по базе предложений

### Интеграции
- **Авиабилеты**: Travelpayouts Flight Search API (Aviasales)
- **Отели**: Travelpayouts Hotels API (Hotellook)
- **Авто**: Travelpayouts Car Rental API
- **Экскурсии**: Viator API / GetYourGuide
- **Платежи**: ЮKassa (для РФ)
- **Telegram**: Telegram Bot API

### Инфраструктура
- **Сервер**: Timeweb Cloud VPS (2 vCPU, RAM, 216.57.110.191)
- **ОС**: Ubuntu 22.04
- **Reverse proxy**: Nginx
- **SSL**: Let's Encrypt (Certbot)
- **CI/CD**: GitHub Actions → SSH deploy
- **Мониторинг**: Prometheus + Grafana / UptimeRobot

## Схема взаимодействия

```
Пользователь
    │
    ├── Web (novahorizon.ru) → Next.js → FastAPI
    ├── Telegram Bot → Bot API → FastAPI
    └── Mobile App (будущее) → FastAPI

FastAPI
    ├── AI Agent Layer (Claude API + LangChain)
    │   ├── Tour Advisor Agent
    │   ├── Price Comparison Agent
    │   └── Travel Concierge Agent
    ├── Travelpayouts API
    │   ├── Flight Search
    │   ├── Hotels Search
    │   └── Car Rental
    ├── PostgreSQL (основные данные)
    └── Redis (кэш, очереди)
```

## Структура API

```
/api/v1/
├── /search
│   ├── /flights          # Поиск авиабилетов
│   ├── /hotels           # Поиск отелей
│   └── /tours            # AI-подбор туров
├── /booking
│   ├── /create           # Создать бронь
│   └── /status/{id}      # Статус брони
├── /ai
│   ├── /chat             # Чат с AI-помощником
│   └── /recommend        # AI-рекомендации
└── /user
    ├── /profile          # Профиль пользователя
    └── /trips            # «Мои поездки»
```
