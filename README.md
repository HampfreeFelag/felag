# FÉLAG

**Образовательный блог о трейдинге, криптовалюте и ремесле**

[![Astro](https://img.shields.io/badge/Astro-4C1D95?logo=astro&logoColor=fff&style=flat)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=flat)](https://www.typescriptlang.org)
[![Build passing](https://img.shields.io/badge/build-passing-brightgreen?style=flat)](https://felag.online)

---

**Последнее обновление:** 17 октября 2026 г.
**Статус:** Стабильно, CI passing, GitHub Pages deployed

**Сайт:** [Felag.online](https://felag.online)
**Приватный репо:** [hampfreeblog-private](https://github.com/HampfreeFelag/hampfreeblog-private)

**Лицензия:** [CC BY-NC-SA 4.0](LICENSE) — некоммерческое использование с указанием авторства

---

## Быстрый старт

### Установка зависимостей:

```bash
npm install
```

### Запуск dev-сервера:

```bash
npm run dev
```

Откройте <http://localhost:4321> в браузере.

### Сборка для продакшена:

```bash
npm run build
```

### Превью продакшен-сборки:

```bash
npm run preview
```

---

## Структура проекта

```
├── public/              # Статические файлы
├── src/
│   ├── components/      # Astro компоненты
│   ├── content/         # Контент блога (Markdown)
│   ├── layouts/         # Layout компоненты
│   ├── pages/           # Страницы сайта
│   ├── styles/          # CSS стили (global.css)
│   └── i18n/            # Интернационализация (RU, EN)
├── astro.config.mjs     # Конфигурация Astro
└── package.json         # Зависимости
```

---

## Дизайн-система

### Félag Editorial Minimal (с 15.09.2026)

- **Философия:** типографика-first — hairline-линии вместо карточек, воздух, editorial-минимализм
- **Шрифты:** Cormorant Garamond (заголовки), Inter (текст), JetBrains Mono (кикеры, мета, рубрики)
- **Референсы:** satnaing.dev, lekoarts.de, astro-micro

**Цвета:**
- **Фон:** `#FAF9F6` — тёплая бумага
- **Текст:** `#1B1A17` (основной), `#67635B` (вторичный), `#9B968B` (третичный)
- **Акцент:** `#1E3A5F` — фьорд-синий (ссылки, активные элементы)
- **Кикеры:** `#A97B2C` — янтарь (рубрики, секции, TOC)
- **Линии:** `#E4E1DA` / `#EDEAE4` — hairline-разделители

**Концепция:** «Без магии. Только ремесло и честный курс.» Судовой журнал варяжского торгового товарищества.

### Деплой

**Пуш в `main` автоматически деплоит на felag.online** (`.github/workflows/deploy.yml`).

### Категории

| Slug | Название | Содержание |
|------|----------|------------|
| `route` | МАРШРУТ | Стратегии и торговые пути |
| `forge` | КУЗНЯ | Инструменты, боты, разработка |
| `helm` | ШТУРВАЛ | Управление рисками и капиталом |
| `treasury` | КАЗНА | Финансы, налоги, отчётность |
| `compass` | КОМПАС | Аналитика, индикаторы, обзоры |
| `logbook` | БОРТЖУРНАЛ | Новости, события, дайджесты |
| `crew` | КОМАНДА | О проекте и команде |

---

## Языки

Блог поддерживает 2 языка:
- Русский (RU)
- English (EN)

**Испанский (ES) удалён** (коммит #619).

Контент хранится в `src/content/blog-[lang]/`

**Структура статьи:** одна папка = одна статья; внутри только `index.md` (и при необходимости `assets/` для картинок).

---

## Контент

Статьи пишутся в Markdown формате в папке `src/content/blog-[lang]/[slug]/`

**Структура статьи:**
```markdown
---
title: "Заголовок"  # До 100 символов, H1
description: "Описание (150-160 символов для SEO)"
pubDate: '2026-01-15'  # Формат: YYYY-MM-DD
category: 'route'  # Одна из 7 категорий (см. таблицу выше)
draft: true  # true = скрыта, false = видна
---

# Заголовок статьи

Контент статьи...
```

---

## Аудит контента

Автоматическая проверка статей по критериям качества и соответствия editorial guidelines.
Полная документация — в приватном репозитории [hampfreeblog-private](https://github.com/HampfreeFelag/hampfreeblog-private).

---

## Технологии

- **Astro 5.x** — статический генератор сайтов
- **TypeScript** — типизация
- **CSS** — design tokens (полная спецификация — [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md))
- **Markdown/MDX** — контент блога
- **GitHub Actions** — автоматический деплой на GitHub Pages

---

## Команды

| Команда         | Действие                              |
| --------------- | ------------------------------------- |
| `npm install`   | Установить зависимости                |
| `npm run dev`   | Запустить dev-сервер (localhost:4321) |
| `npm run build` | Собрать продакшен-версию              |
| `npm run preview` | Превью продакшен-сборки               |

---

## Безопасность

**Важно:** В публичный репозиторий коммитятся только файлы, необходимые для функционирования блога.

- Планы, стратегии и внутренняя документация хранятся в [приватном репозитории](https://github.com/HampfreeFelag/hampfreeblog-private)
- API ключи и секреты не должны попадать в репозиторий
- **Коммиты:** сообщения — на английском. `git config user.email "HampfreeFelag@users.noreply.github.com"`

---

## Деплой

Блог автоматически деплоится на GitHub Pages через GitHub Actions при пуше в ветку `main`.

### OG изображения

OG изображения генерируются автоматически при сборке.

---

## Статус проекта

**Текущая версия:** 7 категорий, 2 языка

**Что готово:**
- Félag Editorial Minimal дизайн-система (см. [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md))
- 7 категорий: Route, Forge, Helm, Treasury, Compass, Logbook, Crew
- 2 языка: RU + EN
- Адаптивный дизайн (mobile-first)
- Анимации и плавные переходы
- Автоматический деплой на GitHub Pages
- ~118 файлов статей (59 RU + 59 EN)

**Что делать:**
- Добавить контент для Helm, Treasury, Logbook, Crew

---

**FÉLAG — Без магии. Только ремесло и честный курс.**
