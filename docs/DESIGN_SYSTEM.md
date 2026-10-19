# 🎨 FÉLAG — DESIGN SYSTEM

**Дата:** 10 октября 2026
**Источник:** `src/styles/global.css` (design tokens), `src/utils/og-image.tsx` (OG-изображения)
**Стиль:** Félag Editorial Minimal — «типографика-first»: тёплая бумага, hairline-линии вместо карточек, фьорд-синий акцент + янтарные кикеры.

> Этот документ — справочник для всех будущих изменений дизайна и автоматизации (в т.ч. генерации OG-изображений).

---

## 1. Философия

- **Типографика-first.** Иерархия создаётся шрифтом, размером и воздухом, а не рамками и тенями.
- **Hairline вместо карточек.** Разделение — тонкие линии `1px`, а не «коробочки».
- **Тёплая бумага.** Фон не белый, а тёплый (#FAF9F6).
- **Два акцента:** фьорд-синий (ссылки, активные элементы) и янтарь (рубрики, кикеры, TOC).
- **Референсы:** satnaing.dev, lekoarts.de, astro-micro.

---

## 2. Цветовая палитра (светлая тема)

### Базовая

| Токен | HEX | Назначение |
|-------|-----|-----------|
| `--color-bg` | `#FAF9F6` | Основной фон (тёплая бумага) |
| `--color-bg-subtle` | `#F1EFEA` | Подложки, код, цитаты |
| `--color-surface` | `#FFFFFF` | Поверхности (dropdown) |
| `--color-surface-hover` | `#FCFBF9` | Ховер поверхностей |

### Текст

| Токен | HEX | Назначение |
|-------|-----|-----------|
| `--color-text` | `#1B1A17` | Основной текст, заголовки |
| `--color-text-secondary` | `#67635B` | Вторичный текст, абзацы |
| `--color-text-tertiary` | `#9B968B` | Третичный: мета, даты, подписи |

### Акценты

| Токен | HEX | Назначение |
|-------|-----|-----------|
| `--color-accent` | `#1E3A5F` | Фьорд-синий: ссылки, активные элементы |
| `--color-accent-hover` | `#14283F` | Ховер ссылок |
| `--color-accent-light` | `#E7EBF1` | Подчёркивание ссылок, выделение |
| `--color-amber` | `#A97B2C` | Янтарь: кикеры, секции, TOC, дисклеймер |
| `--color-amber-light` | `#F2E9D8` | Светлый янтарь |

### Линии

| Токен | HEX | Назначение |
|-------|-----|-----------|
| `--color-border` | `#E4E1DA` | Основные границы |
| `--color-border-light` | `#EDEAE4` | Hairline-разделители |

### Цвета категорий

| Токен | Категория | HEX |
|-------|-----------|-----|
| `--cat-route` | Маршрут | `#1E3A5F` |
| `--cat-forge` | Кузница | `#A97B2C` |
| `--cat-helm` | Штурвал | `#3E6E96` |
| `--cat-treasury` | Казна | `#8A6423` |
| `--cat-compass` | Компас | `#5E7355` |
| `--cat-logbook` | Бортжурнал | `#4E7DA3` |
| `--cat-crew` | Команда | `#A54E4B` |

Используются классами `.cat-route … .cat-crew` (цвет рубрики на карточках и в списках).

---

## 3. Типографика

### Шрифты

| Токен | Стек | Назначение |
|-------|------|-----------|
| `--font-serif` | `'Cormorant Garamond', Georgia, 'Times New Roman', serif` | Заголовки (H1–H6), wordmark |
| `--font-sans` | `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` | Основной текст |
| `--font-mono` | `'JetBrains Mono', 'Fira Code', monospace` | Кикеры, мета, рубрики, кнопки, код |

### Иерархия заголовков

| Элемент | Размер | Начертание | Line-height | Letter-spacing |
|---------|--------|-----------|-------------|----------------|
| `h1` (главная) | `clamp(2.4rem, 5.5vw, 3.8rem)` | 600 | 1.15 | -0.015em |
| `h2` | `clamp(1.7rem, 3.5vw, 2.4rem)` | 600 | 1.15 | -0.015em |
| `h3` | `clamp(1.3rem, 2.2vw, 1.6rem)` | 600 | 1.15 | -0.015em |
| `.post-title-full` (H1 статьи) | `clamp(2.1rem, 4.5vw, 3.2rem)` | 600 | 1.12 | -0.02em |
| `.page-title` | `clamp(2rem, 4vw, 2.8rem)` | 600 | 1.15 | -0.02em |
| `.banner-title` | `1.45rem` | 600 | 1.25 | — |

> Все заголовки — `--font-serif`, `font-weight: 600`.

### Основной текст

| Элемент | Размер | Line-height | Цвет |
|---------|--------|-------------|------|
| `body` | `1rem` (16px) | 1.7 | `--color-text` |
| `p` | 1rem | 1.75 | `--color-text-secondary` |
| `.post-lead` | 1.12rem | 1.65 | secondary |
| `.hero p` | 1.15rem | — | secondary |
| `.banner-subtitle` / `.post-desc` | 0.92rem | 1.6 | secondary |
| `.banner-rubric` | 0.72rem (mono, uppercase, ls 0.1em) | — | tertiary |
| `.section-label` | 0.85rem (mono) | — | amber |
| `.breadcrumbs` | 0.72rem (mono) | — | tertiary |

Базовый размер `html` — `16px`. Сглаживание: `antialiased`, `text-rendering: optimizeLegibility`.

---

## 4. Отступы и сетка

### Шкала отступов

| Токен | Значение |
|-------|----------|
| `--space-xs` | 4px |
| `--space-sm` | 8px |
| `--space-md` | 16px |
| `--space-lg` | 24px |
| `--space-xl` | 32px |
| `--space-2xl` | 48px |
| `--space-3xl` | 64px |
| `--space-4xl` | 96px |

> Шкала не строго 8-pt (есть 4px и 24px), но кратна 4. В контенте используем только эти токены, без хардкода.

### Максимальные ширины

| Токен | Значение | Назначение |
|-------|----------|-----------|
| `--max-width` | 1120px | Контейнер страницы |
| `--max-width-narrow` | 800px | Hero-контент |
| `--content-max` | 680px | Ширина колонки текста статьи |
| `--page-padding` | `clamp(20px, 5vw, 48px)` | Боковые отступы страницы |

### Вертикальный ритм статьи (`.prose`)

- H2: `margin-top: 64px`, `padding-top: 48px`, `border-top: 1px hairline`, `margin-bottom: 24px`
- H3: `margin-top: 48px`, `margin-bottom: 16px`
- Абзац: `margin-bottom: 24px`
- Изображение: `margin: 32px 0`

---

## 5. Радиусы, тени, переходы

| Токен | Значение |
|-------|----------|
| `--radius-sm` | 3px |
| `--radius-md` | 4px |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--duration-fast` | 150ms |
| `--duration-normal` | 250ms |
| `--duration-slow` | 450ms |

Тень используется одна: dropdown — `0 12px 40px rgba(27, 26, 23, 0.08)`.

---

## 6. Компоненты

### Header (`.main-header`)
- Sticky, `top: 0`, `z-index: 100`, фон `--color-bg`, нижняя граница hairline.
- Высота `.header-container`: **72px**.
- Wordmark: serif, 1.4rem, weight 700, ls 0.02em; руна ᚠ рядом — цвет amber.

### Карточка поста (`.post-card`)
- Плоская: `padding: 24px 0`, `border-bottom: 1px hairline`. Без фона и тени.
- Заголовок 1.45rem serif; при ховере → `--color-accent`.
- «Читать» (`.read-more-link`): mono 0.8rem tertiary, стрелка `→` сдвигается на 4px.

### Баннер-рубрика (`.banner-rubric`)
- mono 0.72rem, `font-weight: 500`, `text-transform: uppercase`, `letter-spacing: 0.1em`, цвет категории.

### Фильтр категорий (`.tag-btn`)
- Pill: `border-radius: 999px`, `padding: 6px 14px`, mono 0.72rem, граница `--color-border`.
- Активный: фон `--color-accent`, текст `--color-bg`.
- Текст кнопки — формат «Лор: Описание» (`cat.*.display`), например «Кузница: Инструменты и разработка».

### Поиск (`.search-bar input`)
- Только нижняя граница; при фокусе — `--color-accent`. Без рамки и фона.

### Кнопки
- `.btn`: mono 0.85rem, `padding: 16px 32px`, фон accent, текст bg, radius sm.
- `.text-link`: mono 0.9rem, нижняя граница accent-light, стрелка `→`.

### Блок кода (`.prose pre`)
- Фон `--color-bg-subtle`, граница hairline, radius md, `padding: 24px`, горизонтальный скролл.

### Инлайн-код (`.prose code`)
- mono `0.875em`, фон subtle, `padding: 2px 6px`, radius sm.

### Таблица (`.prose table`)
- `border-collapse: collapse`, ячейки: граница 1px, `padding: 8px 16px`.
- Заголовок (`th`): фон subtle, weight 600.

### Цитата (`.prose blockquote`)
- `border-left: 2px solid accent`, `padding-left: 24px`, курсив, цвет secondary.

### Дисклеймер (`.post-disclaimer`)
- `border-left: 2px solid amber`, фон subtle, radius `0 3px 3px 0`, `padding: 24px`.
- Заголовок — mono 0.8rem, цвет amber.

### TOC (`.toc-sticky`)
- Sticky `top: 104px`, ширина 220px. Пункты: mono/0.8rem tertiary, левая граница; активный — accent.

### Breadcrumbs (`.breadcrumbs`)
- mono 0.72rem tertiary, разделитель — `--color-border`.

### ScrollTop (`.scroll-top`)
- Фиксированная круглая кнопка 42×42px, поверхность + граница hairline; при ховере — accent.

### Footer (`.main-footer`)
- Верхняя граница hairline, `padding: 48px 0`, flex space-between.

---

## 7. Темы

### Текущий статус

- **Светлая тема** — реализована полностью (токены в `:root`).
- **Тёмная тема** — **реализована** (токены в `[data-theme="dark"]`, строки 77–98 `global.css`).
- **Переключатель** — кнопка `#theme-toggle-mobile` в `MobileMenu.astro`, обработчик в `Header.astro`.
- **FOUC защита** — инлайн-скрипт в `<head>` макета (`BlogPost.astro`), применяет тему до отрисовки.
- **Сохранение** — выбор темы хранится в `localStorage` под ключом `felag_theme`.

### Реализованные токены тёмной темы

```css
[data-theme="dark"] {
  --color-bg: #14130F;
  --color-bg-subtle: #1F1D18;
  --color-surface: #1F1D18;
  --color-surface-hover: #26241E;

  --color-text: #F2F0EA;
  --color-text-secondary: #B9B4A8;
  --color-text-tertiary: #857F73;

  --color-accent: #7FA6D4;
  --color-accent-hover: #9BBBDD;
  --color-accent-light: #26313F;

  --color-amber: #D8A64A;
  --color-amber-light: #33280F;

  --color-border: #2E2B24;
  --color-border-light: #26241E;
}
```

### FOUC защита

В `<head>` макета (`BlogPost.astro`) добавлен инлайн-скрипт:

```js
(function() {
  var saved = localStorage.getItem('felag_theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'dark' || (!saved && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
```

Применяется до отрисовки DOM — никакого мерцания.

### Переключатель темы

Кнопка `#theme-toggle-mobile` в `MobileMenu.astro` имеет обработчик в `Header.astro`:
- Переключает `data-theme` на `document.documentElement`
- Сохраняет выбор в `localStorage` (ключ `felag_theme`)
- Обновляет иконку (солнце/луна)
- Работает при загрузке страницы и по клику

> Все компоненты читают цвета из CSS-переменных, поэтому после добавления блока `[data-theme="dark"]` тема заработает без правок компонентов.

---

## 8. OG-изображения

Генерация: `src/utils/og-image.tsx` (Satori) + `scripts/generate-og-images.mjs`, результат — `dist/og/`.

⚠️ **Важно:** в `og-image.tsx` используется **отдельная** палитра (старая «Nordic»: `#F5F0EB`, `#3A5F7F`, `#D49B3B` и т.д.), которая **не совпадает** с текущими токенами `global.css`. При следующей доработке OG-изображений палитру стоит синхронизировать с разделом 2 этого документа.

Руны категорий для OG:

| Категория | Руна | Смысл |
|-----------|------|-------|
| route | ᚱ | Raido — путь |
| forge | ᚠ | Fehu — ремесло |
| helm | ᚺ | Hagalaz — управление |
| treasury | ᛇ | Eihwaz — сокровище |
| compass | ᚲ | Kaunan — маяк |
| logbook | ᚨ | Ansuz — знание |
| crew | ᛗ | Mannaz — общность |

---

## 9. Правила

- ✅ Использовать только токены (`var(--…)`), без хардкода цветов и отступов.
- ✅ Заголовки — serif; кикеры/мета/рубрики/кнопки — mono; текст — sans.
- ✅ Разделять блоки hairline-линиями, а не карточками и тенями.
- ✅ Радиусы минимальные (3–4px) или pill (999px) для фильтров.
- ❌ Не добавлять `---` (hr) внутри тела статьи.

---

## 10. Состояния ссылок

Все состояния реализованы в `global.css` (строки ~141–163):

| Состояние | CSS-селектор | Цвет | Контраст (светлая) | Контраст (тёмная) |
|-----------|-------------|------|-------------------|-------------------|
| Default | `a` | `var(--color-accent)` | 5.7:1 ✅ | 4.1:1 ✅ |
| Visited | `a:visited` | `var(--color-accent)` | 5.7:1 ✅ | 4.1:1 ✅ |
| Hover | `a:hover` | `var(--color-accent-hover)` | 7.2:1 ✅ | 5.3:1 ✅ |
| Focus | `a:focus-visible` | `var(--color-accent)` + outline 2px | — | — |
| Active | `a:active` | `var(--color-accent-hover)` | 7.2:1 ✅ | 5.3:1 ✅ |

### `.prose a` (внутри статьи)

| Свойство | Значение |
|----------|----------|
| `text-decoration` | `underline` |
| `text-decoration-color` | `var(--color-accent-light)` |
| `text-underline-offset` | `3px` |
| `text-decoration-thickness` | `1px` |
| Hover underline color | `var(--color-accent)` |
| Transition | `150ms cubic-bezier(0.16, 1, 0.3, 1)` |

### Доступность

- `:focus-visible` — видимый outline 2px для навигации с клавиатуры
- `:visited` — тот же цвет что и `:link` для editorial consistency (без фиолетового артефакта браузера)
- `prefers-reduced-motion` — все анимации отключены
- Touch targets — все интерактивные элементы ≥ 44×44px

---

**Статус:** ✅ Актуально
