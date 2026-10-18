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
//    См. REFERRAL_LINKS_GUIDE v3.3.
export const REFERRAL_LINKS = {
  kvmka: 'https://kvmka.ru/?from=23600',
  regru: 'https://www.reg.ru/?rlink=2sf6wowehp',
  // 🔜 Т-Банк: получить реф-ссылки в https://partners.tbank.ru/
  tint: 'https://www.tbank.ru/invest/',
} as const;

export function getReferralLink(platform: keyof typeof REFERRAL_LINKS): string {
  return REFERRAL_LINKS[platform];
}

const ALL_BANNERS: AdBanner[] = [
  // ── kvmka.ru — серверные решения для автоматизации (статьи forge) ──
  // Middle Ground формулировка: фокус на технической потребности (аптайм, пинг).
  // Скрыт до получения erid: зарегистрировать креатив в Яндекс ОРД.
  {
    id: 'kvmka-vps',
    title: 'Серверные решения для автоматизации',
    subtitle: 'VPS-конфигурации для круглосуточной работы торговых алгоритмов и Telegram-ботов.',
    cta: 'Посмотреть тарифы kvmka.ru',
    link: REFERRAL_LINKS.kvmka,
    erid: '',
    advertiser: { name: 'kvmka.ru', inn: '', site: 'kvmka.ru' }, // ИНН уточнить из оферты
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

  // ── Reg.ru — инфраструктура для веб-проектов (статьи forge) ──
  // Middle Ground формулировка: акцент на задаче читателя (запуск IT-проекта).
  // Скрыт до получения erid: зарегистрировать креатив в Яндекс ОРД.
  {
    id: 'regru-hosting',
    title: 'Инфраструктура для веб-проектов',
    subtitle: 'Регистрация доменов в зоне .RU и хостинг на защищённых серверах.',
    cta: 'Перейти на Reg.ru',
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

  // ── Т-Банк — финансовые инструменты (статьи treasury, route) ──
  // Middle Ground формулировка: деловой тон, без личных отсылок.
  // 🔜 Получить реф-ссылки в https://partners.tbank.ru/, зарегистрировать креатив в ОРД.
  // ⚠️ Для финансовых услуг обязательно указание лицензии ЦБ РФ.
  {
    id: 'tinkov-finance',
    title: 'Финансовые инструменты для бизнеса и личных задач',
    subtitle: 'Дебетовые карты с программами лояльности и расчётные счета для самозанятых.',
    cta: 'Изучить продукты Т-Банка',
    link: REFERRAL_LINKS.tint,
    erid: '',
    advertiser: { name: 'АО «Т-Банк»', inn: '7706188893', site: 'tbank.ru' },
    cblicense: 'Генеральная лицензия Банка России № 2673',
    categories: ['treasury', 'route'],
    languages: ['ru'],
    priority: 8,
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
