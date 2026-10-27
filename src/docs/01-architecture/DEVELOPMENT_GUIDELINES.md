# 🛠️ DEVELOPMENT GUIDELINES

> Создано: 27.10.2026
> Репозиторий: `felag` (public)
> SSOT: `HampfreeBlog-Private/SYSTEM_ARCHITECTURE.md`

---

## 📋 СОДЕРЖАНИЕ

- [Recent Architectural Decisions](#recent-architectural-decisions)
- [TOC IntersectionObserver](#toc-intersectionobserver)
- [GA4 Event Tracking](#ga4-event-tracking)
- [Description DRY Principle](#description-dry-principle)
- [Ad Banner Configuration](#ad-banner-configuration)
- [Content Structure](#content-structure)

---

## Recent Architectural Decisions

### 2026-10-27: TOC IntersectionObserver rootMargin

**Проблема:** Подсветка активного пункта в оглавлении (TOC) не срабатывала при клике на якорную ссылку.

**Корень:** `rootMargin: '-20% 0px -60% 0px'` создавал зону пересечения ~20% от верха viewport. Заголовок останавливался под header (благодаря `scroll-margin-top: 120px`), но Observer считал его "невидимым".

**Решение:**
```javascript
// src/layouts/BlogPost.astro
const observerOptions = {
  root: null,
  rootMargin: '-120px 0px -50% 0px',  // учитывает scroll-margin-top
  threshold: 0
};
```

**Почему `-120px`:** Точно соответствует `scroll-margin-top: 120px` из `global.css:1602` для десктопа (1440px+). Header height = 72px + отступ = 120px.

**Где:** `src/layouts/BlogPost.astro:271-275`

---

### 2026-10-27: GA4 single initialization

**Проблема:** GA4 инициализировался дважды — в `Analytics.astro` и в `outbound-tracking.ts`.

**Решение:**
- Убран вызов `initOutboundTracking()` из `BlogPost.astro:460-464`
- `outbound-tracking.ts` теперь только отслеживает клики, не отправляет в GA4
- Основная инициализация остаётся только в `Analytics.astro`

**Важно:** `PUBLIC_GA_MEASUREMENT_ID` должна быть установлена в GitHub Secrets перед деплоем.

**Где:** `src/components/Analytics.astro`, `src/layouts/BlogPost.astro`

---

### 2026-10-27: Description DRY Principle

**Правило:** Поле `description` в frontmatter serves dual purpose:
1. SEO meta-тег (`<meta name="description">` в `<head>`)
2. Подзаголовок в баннере статьи (`<p class="banner-subtitle">`)

**Не дублировать:** Не добавляйте отдельный `lead` или `intro` в markdown-файл, если `description` уже описывает суть статьи.

**Где:** `src/components/Banner.astro:48`, `src/components/BaseHead.astro:136`

---

## GA4 Event Tracking

### Правила

1. **Всегда использовать `transport_type: 'beacon'`** для событий внешних ссылок — гарантирует отправку даже при выгрузке страницы.

2. **Без PII:** Не передавайте email, phone, login в событиях GA4. Используйте только:
   - `pathname` (внутренние ссылки)
   - `hostname` (внешние ссылки)

3. **Single source of truth:** Инициализация GA4 только в `Analytics.astro`.

### Пример

```javascript
gtag('event', 'click', {
  event_category: 'outbound',
  event_label: 'link',
  transport_type: 'beacon',
});
```

---

## Ad Banner Configuration

### Правила (38-ФЗ РФ)

1. Баннер с внешней партнёрской ссылкой **не рендерится**, пока `erid === ''`
2. Плашка «Реклама» + рекламодатель + erid — обязательны
3. Криптобиржи и офшорные крипто-сервисы — **ЗАПРЕЩЕНЫ** (132-ФЗ)
4. `internal: true` — собственная перелинковка (не реклама, erid не нужен)

### Где

| Файл | Назначение |
|------|-----------|
| `src/config/ad-banners.ts` | Конфиг баннеров (категории, языки, ERID) |
| `src/integrations/ad-banners.ts` | Astro-интеграция для генерации PNG |
| `src/layouts/BlogPost.astro:327-463` | Клиентская вставка баннера в статью |

### Баннеры активны

| ID | Партнёр | Категории | ERID | Статус |
|----|---------|-----------|------|--------|
| `kvmka-vps` | kvmka.ru | forge | ✅ | Активен |
| `regru-hosting` | Reg.ru | route, forge | ✅ | Активен |
| `tinkov-finance` | Т-Банк | treasury | ✅ | Активен |
| `veles-software` | Veles | forge, compass | ✅ | Активен |
| `default-felag` | Félag (internal) | — | N/A | Всегда виден |

---

## Content Structure

### Формат статьи

```
src/content/blog-[lang]/[slug]/index.md
```

### Frontmatter

```yaml
---
draft: false           # true = скрыта, false = видна
title: 'Заголовок'     # До 100 символов
description: 'Описание' # SEO + подзаголовок в баннере
pubDate: '2026-10-27'  # YYYY-MM-DD
category: 'crew'       # route|forge|helm|treasury|compass|logbook|crew
---

## Введение

Текст статьи...
```

### Правила

1. **Заголовок в body:** Не дублируйте `title` из frontmatter в виде `<h1>` — баннер уже рендерит `<h1>{title}</h1>`.
2. **Первый раздел:** Используйте `## Введение` (или `## Introduction` для EN) как первый заголовок — он попадёт в TOC.
3. **Якорные ссылки:** Astro автоматически генерирует `id` из slug заголовков.

---

**Обновлено:** 27 октября 2026
