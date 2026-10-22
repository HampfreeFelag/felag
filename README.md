# FÉLAG

**Бортовой журнал торгового товарищества. Без иллюзий. Только ремесло.**

[![Astro](https://img.shields.io/badge/Astro-4C1D95?logo=astro&logoColor=fff&style=flat)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=flat)](https://www.typescriptlang.org)
[![Build passing](https://img.shields.io/badge/build-passing-brightgreen?style=flat)](https://felag.online)

---

**Последнее обновление:** 22 октября 2026 г.  
**Статус:** Стабильно, CI passing, GitHub Pages deployed

**Сайт:** [felag.online](https://felag.online)  
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
├── public/              # Статические файлы, OG-изображения, шрифты
├── src/
│   ├── components/      # Astro компоненты (Header, Footer, Breadcrumb...)
│   ├── content/         # Контент блога (Markdown: blog-ru, blog-en)
│   ├── layouts/         # Layout компоненты (BlogPost, TerminalLayout)
│   ├── pages/           # Страницы сайта ([lang]/saga/, [lang]/about...)
│   ├── styles/          # CSS стили (global.css — design tokens)
│   └── i18n/            # Интернационализация (RU, EN)
├── astro.config.mjs     # Конфигурация Astro 5.x
└── package.json         # Зависимости
```

---

## Дизайн-система

### Félag Editorial Minimal

- **Философия:** типографика-first — hairline-линии вместо карточек, воздух, editorial-минимализм
- **Шрифты:** Cormorant Garamond (заголовки), Inter (текст), JetBrains Mono (кикеры, мета, рубрики)
- **Концепция:** «Судовой журнал варяжского торгового товарищества. Без магии. Только ремесло и честный курс.»

**Цвета:**
- **Фон:** `#FAF9F6` — тёплая бумага
- **Текст:** `#1B1A17` (основной), `#67635B` (вторичный), `#7A756B` (третичный)
- **Акцент:** `#1E3A5F` — фьорд-синий (ссылки, активные элементы)
- **Кикеры:** `#A97B2C` — янтарь (рубрики, секции, TOC)
- **Линии:** `#E4E1DA` / `#EDEAE4` — hairline-разделители

### Деплой

**Пуш в `main` автоматически деплоит на felag.online** (`.github/workflows/deploy.yml`).

### Рубрики

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

Статьи пишутся в Markdown формате в `src/content/blog-[lang]/[slug]/index.md`.
Структура: одна папка = одна статья; внутри `index.md` и при необходимости `assets/` для картинок.

**Frontmatter:**
```yaml
---
title: "Заголовок"       # До 100 символов
description: "SEO-описание (150-160 символов)"
pubDate: '2026-01-15'   # YYYY-MM-DD
category: 'route'       # Одна из 7 рубрик
draft: true             # true = скрыта, false = видна
---
```

---

## Технологии

- **Astro 5.x** — статический генератор сайтов
- **TypeScript** — типизация
- **CSS** — design tokens (полная спецификация — [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md))
- **Markdown/MDX** — контент блога
- **GitHub Actions** — автоматический деплой на GitHub Pages
- **OG Images** — автоматическая генерация превью для соцсетей (Satori + Resvg)

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

## Статус проекта

**Текущая версия:** 7 рубрик, 2 языка, Astro 5.x + TypeScript

**Что готово:**
- Félag Editorial Minimal дизайн-система (см. [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md))
- 7 рубрик: Route, Forge, Helm, Treasury, Compass, Logbook, Crew
- 2 языка: RU + EN
- Адаптивный дизайн (mobile-first)
- Анимации и плавные переходы
- Автоматический деплой на GitHub Pages
- OG-изображения для соцсетей (автоматическая генерация)
- ~132 файлов статей (66 RU + 66 EN)

---

**FÉLAG — Без магии. Только ремесло и честный курс.**
