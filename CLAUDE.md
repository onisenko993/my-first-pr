# Nova Horizon — Рабочие заметки

## Доступы
- **Сервер**: 216.57.110.191, root (пароль хранится локально)
- **GitHub PAT**: хранится локально (не коммитить!)
- **Ветка**: `claude/kind-cray-dv7vnm`
- **Travelpayouts TOKEN**: `548028b84d0ed7b0448ab3ceafd8cbdf`
- **MARKER**: `740755`, **trs**: `540808`
- **Sletat module ID**: `60680718-226c-4013-9659-1a3279d05421`
- **Level.Travel**: promo_id=5470, campaign_id=26

## Компания
- ООО «Нова Горизонт», ИНН: 2365038409, ОГРН: 1262300025954
- Сайт: nova-horizon.ru

## Архитектура
- **Продакшн**: plain HTML сайт `/opt/nova-horizon/frontend/index.html` (~1400 строк)
- **Репозиторий**: Next.js проект в `/home/user/my-first-pr/src/frontend/`
- **SSH из облака недоступен** — все изменения на сервере через PuTTY + Python/sed команды

## Что сделано

### Юридические документы (footer)
- `/opt/nova-horizon/frontend/legal/privacy.html` — Политика конфиденциальности
- `/opt/nova-horizon/frontend/legal/terms.html` — Пользовательское соглашение
- `/opt/nova-horizon/frontend/legal/offer.html` — Условия оферты
- `/opt/nova-horizon/frontend/legal/pd.html` — Обработка персональных данных
- `/opt/nova-horizon/frontend/legal/consent.html` — Согласие на обработку ПД
- `/opt/nova-horizon/frontend/legal/cookies.html` — Политика Cookie
- Все ссылки в footer ведут на `/legal/` документы

### Cookie баннер
- Добавлен перед `</body>`, сохраняется в localStorage

### Вкладки поиска (search-wrap, строки ~525-555)
Структура вкладок в index.html:
```html
<div class="search-tabs">
  <div class="s-tab active">🏖 Туры</div>
  <div class="s-tab">✈️ Авиабилеты</div>
  <div class="s-tab">🏨 Отели</div>
  <div class="s-tab">🗺 Маршруты</div>
</div>
<div id="tab-tours" class="tab-content" ...>  ← Sletat виджет
<div id="tab-flights" class="tab-content" style="display:none" ...>  ← Aviasales виджет
<div id="tab-hotels" class="tab-content" style="display:none" ...>  ← заглушка
<div id="tab-routes" class="tab-content" style="display:none" ...>  ← заглушка
```

JS переключения вкладок (строка ~1165):
```javascript
const tabIds=['tab-tours','tab-flights','tab-hotels','tab-routes'];
document.querySelectorAll('.s-tab').forEach((t,i)=>{
  t.addEventListener('click',()=>{
    // показывает/скрывает tab-content по индексу
  });
});
```

### Статус вкладок
| Вкладка | ID блока | Статус | Виджет |
|---------|----------|--------|--------|
| 🏖 Туры | tab-tours | ✅ Работает | Sletat module `60680718-226c-4013-9659-1a3279d05421` |
| ✈️ Авиабилеты | tab-flights | ✅ Работает | tpwidg.com promo_id=7879 campaign_id=100 |
| 🏨 Отели | tab-hotels | ✅ Работает | tpwidg.com promo_id=8581 campaign_id=193 |
| 🚌 Трансфер | tab-transfer | ✅ Работает | tpwidg.com promo_id=2949 campaign_id=1 |
| 🛡️ Страхование | tab-insurance | ✅ Работает | tpwidg.com promo_id=1590 campaign_id=55 |
| 🚗 Прокат авто | tab-car | ✅ Работает | tp.media promo_id=8813 campaign_id=222 |
| 🚢 Круизы | tab-cruise | ✅ Работает | tpwidg.com promo_id=5919 campaign_id=182 |

### JS переключения вкладок (строка ~1165)
```javascript
const tabIds=['tab-tours','tab-flights','tab-hotels','tab-transfer','tab-insurance','tab-car','tab-cruise'];
```

## Следующие задачи
1. Заменить статичные карточки «Популярные направления» на реальные цены
2. Проверить все виджеты на мобильной версии
