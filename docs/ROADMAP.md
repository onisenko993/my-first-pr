# Дорожная карта Nova Horizon

## Этапы разработки

| Этап | Что делаем | Срок |
|------|-----------|------|
| 0 | AI Management Team — настройка всех агентов | Неделя 1 |
| 1 | Telegram MVP + AI Tour Advisor | Недели 2–4 |
| 2 | Tour Database + интеграция Travelpayouts API | Недели 5–8 |
| 3 | AI Sales Assistant + конструктор путешествий | Недели 9–12 |
| 4 | Website & User Cabinet (novahorizon.ru) | Недели 13–16 |
| 5 | AI Content Engine + YouTube/TikTok/Instagram | Недели 17–20 |
| 6 | AI Travel Concierge + «Моя поездка» | Недели 21–24 |
| 7 | AI Translator + гид по направлениям | Недели 25–28 |
| 8 | In-Trip Assistant + Emergency Assistant | Недели 29–32 |
| 9 | Mobile App (iOS/Android) | Недели 33–40 |
| 10 | AI Price Forecasting | Недели 41–44 |
| 11 | Travel Marketplace (экскурсии, трансферы, страховки) | Недели 45–52 |
| 12 | Расширение на СНГ | Год 2 |

## Текущий приоритет (Этап 0–2)

### Этап 0: Инфраструктура
- [ ] Создать репозиторий GitHub (приватный)
- [ ] Настроить сервер Timeweb (216.57.110.191)
- [ ] Установить Docker + Nginx + SSL на сервер
- [ ] Настроить домен novahorizon.ru → сервер
- [ ] Получить SSL-сертификат (Let's Encrypt)
- [ ] Зарегистрировать аккаунт Travelpayouts
- [ ] Получить API-ключи Travelpayouts

### Этап 1: Telegram MVP
- [ ] Создать Telegram-бота (@NovaHorizonBot)
- [ ] AI Tour Advisor — поиск туров по запросу
- [ ] Интеграция с Aviasales через Travelpayouts
- [ ] Интеграция с Hotellook через Travelpayouts
- [ ] Базовая аналитика запросов

### Этап 2: API и база данных
- [ ] PostgreSQL — база туров и пользователей
- [ ] Travelpayouts Flight Search API
- [ ] Travelpayouts Hotels API (Hotellook)
- [ ] White Label виджеты на сайт
- [ ] Кэширование цен (Redis)
