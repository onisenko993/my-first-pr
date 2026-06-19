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
| Вкладка | Статус |
|---------|--------|
| 🏖 Туры | ✅ Sletat виджет работает |
| ✈️ Авиабилеты | ✅ Aviasales виджет + кнопка |
| 🏨 Отели | 🔲 Заглушка, нужно настроить |
| 🗺 Маршруты | 🔲 Заглушка, нужно настроить |

## Следующие задачи
1. Настроить вкладку «Отели» (Hotellook/Travelpayouts)
2. Настроить вкладку «Маршруты»
3. Заменить статичные карточки «Популярные направления» на реальные цены
