
# Cloudflare Worker: APE Stats Proxy

Простой прокси без серверов. Работает на Cloudflare Workers.

## Что делает
- Принимает запросы на `/api/stats?...`
- Проксирует их на `https://app.glitchy.ai/api/stats?...`
- Подставляет твой Cookie (авторизация)
- Возвращает JSON и включает CORS, чтобы Netlify мог дергать

## Быстрый деплой
1) Установи Node.js и Wrangler:
```bash
npm i -g wrangler
```
2) Войди в Cloudflare:
```bash
wrangler login
```
3) В каталоге проекта выполни:
```bash
wrangler deploy
```
4) Установи секреты (переменные окружения) в воркере:
```bash
wrangler secret put PP_COOKIE
# вставь всю строку cookie и нажми Enter
wrangler secret put TARGET_URL
# вставь https://app.glitchy.ai/api/stats
wrangler secret put USER_AGENT
# вставь Mozilla/5.0
```
(Можно также задать их через панель Cloudflare → Workers → свой проект → Settings → Variables)

5) Получи адрес воркера вида:
```
https://ape-stats-proxy.<your-subdomain>.workers.dev
```
Проверка: 
```
https://...workers.dev/api/health
https://...workers.dev/api/stats
```

## Подключение к Netlify
На Netlify в переменные окружения сайта добавь:
```
VITE_API_BASE=https://ape-stats-proxy.<your-subdomain>.workers.dev
```
Пересобери сайт.

Готово ✅
