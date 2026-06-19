# Интеграция Travelpayouts

## Что такое Travelpayouts

Крупнейшая туристическая партнёрская сеть:
- Aviasales — поиск авиабилетов
- Hotellook — поиск отелей
- Rentalcars — аренда авто
- И 1000+ других партнёров

**Наш Marker**: 540808 (из https://app.travelpayouts.com)

## Комиссии

| Продукт | Комиссия | Cookie |
|---------|---------|--------|
| Авиабилеты (Aviasales) | ~1.6% | 30 дней |
| Отели (Hotellook) | 4–5% | 30 дней |
| Аренда авто | 7% | 30 дней |
| Страховки | до 15% | 30 дней |

## Что подключаем

### 1. Flight Search API (Aviasales Data API)
Поиск дешёвых авиабилетов по направлениям.

Документация: https://support.travelpayouts.com/hc/en-us/articles/203956163

```python
import httpx

async def search_flights(origin: str, destination: str, date: str):
    token = os.getenv("TRAVELPAYOUTS_TOKEN")
    url = "https://api.travelpayouts.com/v1/prices/cheap"
    params = {
        "origin": origin,        # IATA-код, напр. MOW
        "destination": destination,  # напр. DXB
        "depart_date": date,    # YYYY-MM
        "currency": "rub",
        "token": token,
    }
    async with httpx.AsyncClient() as client:
        response = await client.get(url, params=params)
        return response.json()
```

### 2. Hotels Search API (Hotellook)

```python
async def search_hotels(city_id: int, check_in: str, check_out: str, adults: int = 2):
    token = os.getenv("TRAVELPAYOUTS_TOKEN")
    url = "https://engine.hotellook.com/api/v2/search/start.json"
    params = {
        "cityId": city_id,
        "checkIn": check_in,
        "checkOut": check_out,
        "adults": adults,
        "currency": "rub",
        "token": token,
        "lang": "ru",
    }
    async with httpx.AsyncClient() as client:
        response = await client.get(url, params=params)
        return response.json()
```

### 3. White Label виджеты

Готовые виджеты для встраивания на сайт (без кода):
- Форма поиска авиабилетов
- Форма поиска отелей
- Виджет популярных направлений

Пример (добавить в HTML сайта):
```html
<script src="//www.travelpayouts.com/widgetConfig?account_id=YOUR_ACCOUNT_ID&origin=MOW&responsive=true&powered_by=true&border_radius=0&plain=false&color_button=%232681FF&color_icons=%232681FF&color_background=%23FFFFFF&color_border=%23C9D1DC&color_title=%23000000&color_subtitle=%23000000&promo_id=4132&widget=true"></script>
```

### 4. Travel Drive (AI-монетизация контента)
Инструмент для автоматической монетизации блога/соцсетей.

## Регистрация и получение токена

1. Зайдите на https://app.travelpayouts.com
2. Зарегистрируйтесь / войдите
3. Перейдите в Settings → API
4. Скопируйте Token и добавьте в `.env` файл

## Партнёрские ссылки

Все ссылки должны содержать marker:
```
https://www.aviasales.ru/?marker=540808
https://www.hotellook.ru/?marker=540808
```
