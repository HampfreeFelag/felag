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
