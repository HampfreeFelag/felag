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
export const REFERRAL_LINKS = {
  // ✅ готова (REFERRAL_LINKS_GUIDE v2)
  kvmka: 'https://kvmka.ru/?from=23600',
  // ✅ партнёрский код из гайда (rlink); формат проверить при активации
  regru: 'https://www.reg.ru/?rlink=2sf6wowehp',
} as const;

export function getReferralLink(platform: keyof typeof REFERRAL_LINKS): string {
  return REFERRAL_LINKS[platform];
}

const ALL_BANNERS: AdBanner[] = [
  // ── kvmka — VPS для ботов (статьи forge: боты, n8n, автоматизация) ──
  // Скрыт до получения erid: спросить у kvmka готовый токен либо
  // зарегистрировать креатив в ОРД (Яндекс ОРД — пока бесплатный).
  {
    id: 'kvmka-vps',
    title: 'kvmka: VPS для ботов',
    subtitle: 'Серверы для торговых ботов и автоматизации',
    cta: 'Выбрать сервер →',
    link: REFERRAL_LINKS.kvmka,
    erid: '',
    advertiser: { name: 'kvmka.ru', inn: '', site: 'kvmka.ru' }, // ИНН уточнить при активации
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

  // ── Reg.ru — домены/хостинг (статьи forge) ──
  {
    id: 'regru-hosting',
    title: 'Reg.ru: домены и хостинг',
    subtitle: 'Промокод mzpvbkdfyf — скидка 5% на первый заказ',
    cta: 'Перейти →',
    link: REFERRAL_LINKS.regru,
    erid: '',
    advertiser: { name: 'ООО «РЕГ.РУ»', inn: '7710655749', site: 'reg.ru' },
    categories: ['forge'],
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

  // ── FÉLAG — внутренняя перелинковка (не реклама, всегда виден) ──
  {
    id: 'default-felag',
    title: 'FÉLAG',
    subtitle: 'Трейдинг, крипта, автоматизация',
    cta: 'Библиотека →',
    link: '/{lang}/library/',
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
