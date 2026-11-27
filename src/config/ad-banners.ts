// Конфигурация партнёрских баннеров — «белые схемы» (RF-legal)
//
// ⚖️ ПРАВИЛА (см. docs/PROD_CHECKLIST.md раздел 6):
// 1. Баннер с внешней партнёрской ссылкой НЕ рендерится, пока erid === ''
//    (38-ФЗ: реклама без токена ОРД запрещена). Токен выдаёт ОРД
//    (рекламодатель партнёрки может выдать готовый erid — спросить у kvmka/Reg.ru).
// 2. Плашка «Реклама» + рекламодатель + erid — обязательны (рендерится компонентами).
// 3. Криптобиржи и офшорные крипто-сервисы — ЗАПРЕЩЕНЫ (382-ФЗ), список —
//    в REFERRAL_LINKS_GUIDE (private). Pre-commit (проверка 7) блокирует их попадание сюда.
// 4. internal: true — собственная перелинковка (не реклама, erid не нужен).
//
// 📝 ФОРМУЛИРОВКИ «Middle Ground» (editorial tone):
// - ❌ Запрещено: «я использую», «мой выбор», «рекомендую вам», «попробуйте»
// - ✅ Разрешено: фокус на задаче читателя, безличные конструкции
// - Пример: «Для решения задачи...», «Среди доступных решений...», «Инфраструктура для...»
// - См. BANNER_WORKFLOW.md раздел «Middle Ground формулировки»

export type AdBanner = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  link: string;
  /** Токен ОРД (erid). '' = баннер скрыт до регистрации креатива в ОРД */
  erid: string;
  /** Рекламодатель для пометки «Реклама» (38-ФЗ) */
  advertiser?: { name: string; inn: string; site: string };
  /** Лицензия ЦБ РФ (для финансовых услуг). Например: "Генеральная лицензия Банка России № 2673" */
  cblicense?: string;
  /** Категории статей (frontmatter): route/forge/helm/treasury/compass/logbook/crew */
  categories?: string[];
  languages?: ('ru' | 'en')[];
  priority?: number;
  /** true = внутренняя ссылка Félag (не реклама, маркировка не нужна) */
  internal?: boolean;
};

// Партнёрские ссылки (белые схемы — VPS/хостинг, РФ-юрлица)
// ✅ ВСЕ платформы имеют российское юрлицо и/или лицензию ЦБ РФ
// ❌ Altyn (крипто-кошелёк без лицензии ЦБ), криптобиржи —
//    ИСКЛЮЧЕНЫ из активной партнёрки (13.10.2026). Возврат только при изменении юр.статуса.
//    Veles reinstate 18.10.2026 как IT-партнёр (ООО "ВЕЛЕС.ФИНАНС", ИНН 9725074398, ОКВЭД 62.01).
//    ERID токены получены 19.10.2026. См. REFERRAL_LINKS_GUIDE v3.4.
export const REFERRAL_LINKS = {
  kvmka: 'https://kvmka.ru/?from=23600',
  regru: 'https://www.reg.ru/?rlink=reflink-32593309',
  veles: 'https://veles.finance/invite/washmallay',
  tint: 'https://tbank-online.com/baf/2z9xz0ZejZr',
} as const;

export function getReferralLink(platform: keyof typeof REFERRAL_LINKS): string {
  return REFERRAL_LINKS[platform];
}

const ALL_BANNERS: AdBanner[] = [
  // ── kvmka.ru — серверные решения для автоматизации (статьи forge) ──
  {
    id: 'kvmka-vps',
    title: 'Серверные решения',
    subtitle: 'Вычислительные ресурсы для веб-проектов и задач автоматизации.',
    cta: 'Посмотреть конфигурации',
    link: REFERRAL_LINKS.kvmka,
    erid: 'CQH36pWzJqVKznERMApgkbu1yZRi4eK158Cu3G65GNbqPF',
    advertiser: { name: 'kvmka.ru', inn: '', site: 'kvmka.ru' },
    categories: ['forge'],
    languages: ['ru'],
    priority: 10,
  },

  // ── Reg.ru — инфраструктура для веб-проектов (статьи route, forge) ──
  {
    id: 'regru-hosting',
    title: 'Инфраструктура для веб-проектов',
    subtitle: 'Инструменты для регистрации доменов и размещения сайтов.',
    cta: 'Перейти к сервисам',
    link: REFERRAL_LINKS.regru,
    erid: 'CQH36pWzJqVKznERH83R6V9PGJk6Nw97r3FepZSpTSSnud',
    advertiser: { name: 'ООО «РЕГ.РУ»', inn: '7710655749', site: 'reg.ru' },
    categories: ['route', 'forge'],
    languages: ['ru'],
    priority: 5,
  },

  // ── Т-Банк — финансовые инструменты (статьи treasury) ──
  {
    id: 'tinkov-finance',
    title: 'Финансы для бизнеса и личных задач',
    subtitle: 'Расчётные счета для самозанятых и дебетовые карты с программами лояльности.',
    cta: 'Изучить предложения',
    link: REFERRAL_LINKS.tint,
    erid: 'CQH36pWzJqVKznERQSL5xgCvKRJzmsR2PAxxaFmiaN1y77',
    advertiser: { name: 'АО «Т-Банк»', inn: '7706188893', site: 'tbank.ru' },
    cblicense: 'Генеральная лицензия Банка России № 2673',
    categories: ['treasury'],
    languages: ['ru'],
    priority: 8,
  },

   // ── Veles — IT-партнёр (ООО "ВЕЛЕС.ФИНАНС", ИНН 9725074398, ОКВЭД 62.01) — RU ──
   {
     id: 'veles-software-ru',
     title: 'ПО для анализа данных',
     subtitle: 'Программное обеспечение для автоматизации рабочих процессов и проектирования систем.',
     cta: 'Ознакомиться с платформой',
     link: REFERRAL_LINKS.veles,
     erid: 'CQH36pWzJqVKznERGZtWRYzjm6yPFbxFKEnry3zcBHeD37',
     advertiser: { name: 'ООО «ВЕЛЕС.ФИНАНС»', inn: '9725074398', site: 'veles.finance' },
     categories: ['forge', 'compass'],
     languages: ['ru'],
     priority: 7,
   },

   // ── Veles — IT-партнёр (ООО "ВЕЛЕС.ФИНАНС", ИНН 9725074398, ОКВЭД 62.01) — EN ──
   {
     id: 'veles-software-en',
     title: 'Data analysis software',
     subtitle: 'Software for automating workflows and designing trading systems.',
     cta: 'Explore the platform',
     link: REFERRAL_LINKS.veles,
     erid: 'CQH36pWzJqVKznERGZtWRYzjm6yPFbxFKEnry3zcBHeD37',
     advertiser: { name: 'OOO "VELES.FINANCE"', inn: '9725074398', site: 'veles.finance' },
     categories: ['forge', 'compass'],
     languages: ['en'],
     priority: 7,
   },

   // ── FÉLAG — внутренняя перелинковка (не реклама, RU) ──
   {
     id: 'default-felag-ru',
     title: 'Связаться с автором',
     subtitle: 'Telegram, email, вопросы по проекту',
     cta: 'Написать →',
     link: 'https://t.me/hampfree',
     erid: '',
     internal: true,
     languages: ['ru'],
   },

   // ── FÉLAG — internal linking (not ads, EN) ──
   {
     id: 'default-felag-en',
     title: 'Contact the author',
     subtitle: 'Telegram, email, project questions',
     cta: 'Write →',
     link: 'https://t.me/hampfree',
     erid: '',
     internal: true,
     languages: ['en'],
   },
];

/**
 * Публичный список баннеров: реклама без erid скрыта (38-ФЗ),
 * внутренние (internal) — всегда доступны.
 */
export const AD_BANNERS: AdBanner[] = ALL_BANNERS.filter(
  (b) => b.internal || b.erid !== ''
);

/**
 * Выбор баннера для статьи (серверная версия, для BannerCard и BlogPost).
 * Реклама — только с erid и совпадением категории/языка; иначе внутренний fallback.
 */
export function getBannerForArticle(category: string, lang: string): AdBanner | null {
  const ad = AD_BANNERS.find(
    (b) =>
      !b.internal &&
      (!b.categories || b.categories.includes(category)) &&
      (!b.languages || (b.languages as string[]).includes(lang))
  );
  if (ad) return ad;
  // Language-aware fallback
  return AD_BANNERS.find((b) => b.id === `default-felag-${lang}`) || null;
}
