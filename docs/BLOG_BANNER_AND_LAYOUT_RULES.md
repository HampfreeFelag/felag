# Правила вёрстки баннеров и блоков блога (FÉLAG)

Документ фиксирует принятые решения по баннерам, карточкам и блоку «Ещё по теме». Использовать при проверке и доработке всех страниц и статей.

---

## 1. Баннер (Banner.astro)

### 1.1. Структура

```
.banner (flex column)
  └─ .banner-inner (flex column, flex: 1)
       └─ .banner-top (flex column, gap: 8px)
            ├─ .banner-rubric (inline-block, color: text-tertiary)
            ├─ .banner-title (h2/h1, serif)
            └─ .banner-subtitle (p, line-clamp: 2)
```

### 1.2. Типы баннера
- `type="preview"` — в карточках: h2, line-clamp: 2
- `type="full"` — на странице статьи: h1, без ограничения строк

### 1.3. Категория (цветные рубрики)
- Цвет задаётся через CSS-переменные: `--cat-route`, `--cat-forge`, `--cat-helm`, `--cat-treasury`, `--cat-compass`, `--cat-logbook`, `--cat-crew`
- Классы: `.cat-route`, `.cat-forge`, и т.д.
- Шрифт: JetBrains Mono, 0.72rem, uppercase, letter-spacing: 0.1em

---

## 2. Карточки постов (.post-card)

### 2.1. Архитектура карточки

```
.post-card (a, flex column, align-items: stretch)
  └─ .banner (flex: 1 1 auto) — растягивается до макс. высоты ячейки
  └─ .post-meta (margin-top: var(--space-md)) — дата + "Читать полностью"
```

### 2.2. Ключевые правила

| Правило | Значение | Почему |
|---------|----------|--------|
| `align-items: stretch` | на `.post-card` | Дочерние элементы занимают всю ширину ячейки сетки |
| `flex: 1 1 auto` | на `.banner` | Растягивается, заполняя свободное пространство |
| `margin-top: var(--space-md)` | на `.post-meta` | Прижимает дату к низу (НЕ `auto` — banner уже `flex: 1`) |
| `row-gap: var(--space-lg)` | на `.posts-grid` | 24px — компактный, но видимый отступ между строками |
| `padding-top: 0` | на `.posts-list .post-card:first-child` | Сброс верхнего отступа для первого элемента |

### 2.3. :first-child — ТОЛЬКО для .posts-list

```css
/* ✅ Правильно */
.posts-list .post-card:first-child { padding-top: 0; }

/* ❌ Никогда не используй в .posts-grid */
.posts-grid .post-card:first-child { /* ЛОМАЕТ выравнивание */ }
```

Причина: в двухколоночной сетке `:first-child` матчится на первый элемент строки, а не секции.

### 2.4. Сетка

- `.posts-grid` — двухколоночная: `grid-template-columns: repeat(2, 1fr)`
- `.posts-list` — одноколоночная: `grid-template-columns: 1fr`
- `.saga-library` — `display: block` (одноколоночная, для /saga/)

---

## 3. Блок «Ничего не найдено»

На странице /saga/ при отсутствии результатов фильтра:
- `min-height: 40vh` — заполняет пространство
- `display: flex; align-items: center; justify-content: center` — центрирование
- Класс: `.no-posts`

---

## 4. Блок «Ещё по теме» (RelatedPosts)

- Карточки используют тот же компонент Banner (type="preview")
- Ссылки строятся через `translatePath(saga/${normalizePostId(post.id)})` — Никогда не `baseUrl + post.id` (приводит к `saga/saga/` 404)
- Контейнер: `.related-posts-container`

---

## 5. Якорная прокрутка

- `--header-height: 72px` — высота sticky-хедера
- `scroll-margin-top` для заголовков:
  - h1: `calc(72px + 48px)` = 120px
  - h2: `calc(72px + 32px)` = 104px
  - h3/h4: `calc(72px + 24px)` = 96px
  - h5/h6: `calc(72px + 16px)` = 88px
- `scroll-behavior: smooth` — только для `a[href^="#"]`, не для html

---

## 6. Внешние ссылки в статьях

- Rehype-плагин `rehypeExternalLinks` автоматически размечает внешние ссылки классом `.external-link`
- Добавляет `target="_blank" rel="noopener noreferrer"` и SVG-иконку ↗
- В `.prose` внешние ссылки имеют `display: inline` (НЕ `inline-flex` — ломает перенос строк)
- Подчёркивание видимое по умолчанию, усиливается при hover

---

## 7. Проверка

- Проверять по **обеим языковым версиям** (ru, en) и **разрешениям** (375px, 767px, 1024px, 1440px)
- Страницы: главная, каталог (/saga/), страница статьи, about, privacy
- Чеклист перед коммитом: `npm run verify`

---

## 8. Связанные файлы

- `src/components/Banner.astro` — баннер, категория, рубрика
- `src/components/RelatedPosts.astro` — блок «Ещё по теме»
- `src/styles/global.css` — все стили (1800+ строк)
- `src/plugins/rehype-external-links.mjs` — автоматическая разметка внешних ссылок
- `src/utils/blog.ts` — `normalizePostId`, `getRelatedPosts`
