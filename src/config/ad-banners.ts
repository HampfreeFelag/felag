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
  /** Приглушённый бренд-акцент для CTA и рамки (light/dark). Опционально — если нет, используется универсальный янтарь */
  accent?: { light: string; dark: string };
  /** Категории статей (frontmatter): route/forge/helm/treasury/compass/logbook/crew */
  categories?: string[];
  languages?: ('ru' | 'en')[];
  priority?: number;
  /** true = внутренняя ссылка Félag (не реклама, маркировка не нужна) */
  internal?: boolean;
  colors: {
    bgStart: string;
    bgEnd: string;
    text: string;
    ctaBg: string;
    ctaText: string;
    border: string;
  };
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
    colors: {
      bgStart: '#1E3A5F',
      bgEnd: '#14283F',
      text: '#E5E5E5',
      ctaBg: '#A97B2C',
      ctaText: '#FFFFFF',
      border: '#2C4E77',
    },
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
    colors: {
      bgStart: '#1E3A5F',
      bgEnd: '#14283F',
      text: '#E5E5E5',
      ctaBg: '#A97B2C',
      ctaText: '#FFFFFF',
      border: '#2C4E77',
    },
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
    accent: { light: '#C5A028', dark: '#D4B045' },
    colors: {
      bgStart: '#1E3A5F',
      bgEnd: '#14283F',
      text: '#E5E5E5',
      ctaBg: '#A97B2C',
      ctaText: '#FFFFFF',
      border: '#2C4E77',
    },
  },

  // ── Veles — IT-партнёр (ООО "ВЕЛЕС.ФИНАНС", ИНН 9725074398, ОКВЭД 62.01) ──
  {
    id: 'veles-software',
    title: 'ПО для анализа данных',
    subtitle: 'Программное обеспечение для автоматизации рабочих процессов и проектирования систем.',
    cta: 'Ознакомиться с платформой',
    link: REFERRAL_LINKS.veles,
    erid: 'CQH36pWzJqVKznERGZtWRYzjm6yPFbxFKEnry3zcBHeD37',
    advertiser: { name: 'ООО «ВЕЛЕС.ФИНАНС»', inn: '9725074398', site: 'veles.finance' },
    categories: ['forge', 'compass'],
    languages: ['ru', 'en'],
    priority: 7,
    colors: {
      bgStart: '#1E3A5F',
      bgEnd: '#14283F',
      text: '#E5E5E5',
      ctaBg: '#A97B2C',
      ctaText: '#FFFFFF',
      border: '#2C4E77',
    },
  },

  // ── FÉLAG — внутренняя перелинковка (не реклама, всегда виден) ──
  {
    id: 'default-felag',
    title: 'Связаться с автором',
    subtitle: 'Telegram, email, вопросы по проекту',
    cta: 'Написать →',
    link: 'https://t.me/hampfree',
    erid: '',
    internal: true,
    colors: {
      bgStart: '#1E3A5F',
      bgEnd: '#14283F',
      text: '#E5E5E5',
      ctaBg: '#A97B2C',
      ctaText: '#FFFFFF',
      border: '#2C4E77',
    },
  },
];

/**
 * Публичный список баннеров: реклама без erid скрыта (38-ФЗ),
 * внутренние (internal) — всегда доступны.
 */
export const AD_BANNERS: AdBanner[] = ALL_BANNERS.filter(
  (b) => b.internal || b.erid !== ''
);

// Данные для клиентской автовставки (BlogPost.astro читает window.BANNER_DATA)
export const BANNER_TRANSLATIONS: Record<
  string,
  {
    title: { ru: string; en: string };
    subtitle: { ru: string; en: string };
    cta: { ru: string; en: string };
    colors: AdBanner['colors'];
    link?: string | { ru: string; en: string };
    erid?: string;
    internal?: boolean;
    advertiser?: { name: string; inn: string; site: string };
    categories?: string[];
    languages?: ('ru' | 'en')[];
  }
> = Object.fromEntries(
  AD_BANNERS.map((b) => [
    b.id,
    {
      title: { ru: b.title, en: b.title },
      subtitle: { ru: b.subtitle, en: b.subtitle },
      cta: { ru: b.cta, en: b.cta },
      colors: b.colors,
      link: b.link.startsWith('/') ? { ru: b.link.replace('{lang}', 'ru'), en: b.link.replace('{lang}', 'en') } : b.link,
      erid: b.erid,
      internal: b.internal,
      advertiser: b.advertiser,
      categories: b.categories,
      languages: b.languages,
    },
  ])
);

/**
 * Выбор баннера для статьи (серверная версия, для BannerCard).
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
  return AD_BANNERS.find((b) => b.id === 'default-felag') || null;
}
