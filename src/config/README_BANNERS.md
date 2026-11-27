// 🎨 Реферальные баннеры — единый конфиг
//
// Все баннеры управляются ЗДЕСЬ.
//
// ⚠️ С 28.09.2026 BANNER_TRANSLATIONS удалены (коммит bb7f3db).
// Локализация реализована через раздельные -ru/-en записи в ALL_BANNERS.
//
// Файлы:
//   - ad-banners.ts        ← ЭТОТ файл (единый источник)
//   - BlogPost.astro       ← использует getBannerForArticle(category, lang)
//   - AdBanner.astro       ← SSR-рендер, локализованная маркировка (Ad/Реклама)
//
// Добавление нового баннера:
//   1. Добавить ссылку в REFERRAL_LINKS
//   2. Добавить RU-запись в ALL_BANNERS с languages: ['ru']
//   3. Добавить EN-запись в ALL_BANNERS с languages: ['en'] и переводом
//   4. getBannerForArticle() выберет автоматически по lang
//
// Локализация маркировки: AdBanner.astro:30 — adMark = lang === 'en' ? 'Ad' : 'Реклама'
//
// Документация: HampfreeBlog-Private/docs/00-active/BANNER_WORKFLOW.md

// ─── ⚠️ КРИТИЧНЫЕ ПРАВИЛА (POST-27.11.2026) ───
//
// 1. КАЖДЫЙ рекламный баннер — ДВЕ записи: -ru и -en.
//    Одна запись с languages: ['ru', 'en'] = смерть i18n.
//    Коммит bb7f3db (28.09.2026) заменил BANNER_TRANSLATIONS на
//    title: { ru: b.title, en: b.title } — en стал копией ru.
//    Фикс: раздельные записи с уникальными id и переводами.
//
// 2. languages: ['ru'] / languages: ['en'] — фильтр, а не источник текста.
//    Текст берётся из полей title/subtitle/cta конкретной записи.
//    НЕ копировать текст между записями.
//
// 3. Маркировка: AdBanner.astro — adMark по lang.
//    НЕ хардкодить 'Реклама' в span — использовать вычисляемое adMark.
//
// 4. Фоллбэк: default-felag-${lang}, НЕ хардкод 'default-felag'.
//    getBannerForArticle() строит id динамически.
//
// 5. RU-баннеры НЕ показывать в EN-статьях и наоборот.
//    Даже если партнёр универсален — дублировать с переводом.
