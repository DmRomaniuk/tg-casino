# TMA Game — Dev Commands

## Перший запуск

```bash
# Встановити залежності
npm install
```

Створи `.env` в корені проекту:
```env
TELEGRAM_BOT_TOKEN=твій_токен_від_botfather
WEBAPP_URL=https://твій-ngrok-url.ngrok-free.app
```

---

## Запуск сервісів

Кожен сервіс запускається в **окремому терміналі**.

### Frontend
```bash
npx nx serve frontend
# http://localhost:4200
```

### Backend
```bash
npx nx serve backend
# http://localhost:3000
```

### Bot
```bash
npx nx serve bot
# працює через polling, порт не потрібен
```

### Всі одразу
```bash
npx nx run-many --target=serve --projects=frontend,backend,bot --parallel=3
```

---

## ngrok (тунель для Telegram WebApp)

> Потрібен щоб Telegram міг відкрити локальний фронт по HTTPS

```bash
# Запустити тунель
ngrok http 4200
```

Після запуску скопіюй URL виду `https://xxxx.ngrok-free.app` і встав в `.env` як `WEBAPP_URL`.

Після зміни `WEBAPP_URL` — **перезапусти бота**.

> ⚠️ Безкоштовний ngrok змінює URL при кожному перезапуску — не забувай оновлювати `.env` і перезапускати бота.

---

## Тестування

| Що тестуєш | Де |
|---|---|
| UI / верстка | Браузер `http://localhost:4200` |
| Логіка / хуки з Telegram даними | Telegram через ngrok |
| API ендпоінти | Postman / Thunder Client → `http://localhost:3000` |
| Повний флоу | web.telegram.org → бот → кнопка Грати → F12 |

### Дебагінг в Telegram Web
1. Відкрий [web.telegram.org](https://web.telegram.org)
2. Знайди бота → `/start` → натисни "🎮 Грати"
3. `F12` → Console — бачиш всі `console.log`
4. Network tab — бачиш всі запити до бекенду

---

## Збірка

```bash
# Зібрати всі проекти
npx nx run-many --target=build --all

# Зібрати окремо
npx nx build frontend
npx nx build backend
npx nx build bot
```

---

## Корисні команди nx

```bash
# Переглянути граф залежностей
npx nx graph

# Очистити кеш
npx nx reset

# Запустити без кешу
npx nx serve frontend --skip-nx-cache
```

---

## Структура проекту

```
tma-game/
├── apps/
│   ├── frontend/        # React + Vite + MUI (порт 4200)
│   ├── backend/         # NestJS API (порт 3000)
│   └── bot/             # NestJS + Telegraf (polling)
├── libs/
│   ├── shared-types/    # спільні TypeScript типи
│   └── game-logic/      # логіка гри
├── .env                 # токени (не комітити!)
└── nx.json
```