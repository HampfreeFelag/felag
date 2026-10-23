// Конфиг партнёрских ссылок и UTM-меток
// Используется в link-utils.ts для автоматической обработки ссылок

export type PartnerEntry = {
  domain: string;
  utm: {
    source: 'felag';
    medium: 'referral' | 'donation';
    campaign: string;
  };
};

export const PARTNERS: Record<string, PartnerEntry> = {
  veles: {
    domain: 'veles.finance',
    utm: { source: 'felag', medium: 'referral', campaign: 'veles' },
  },
  kvmka: {
    domain: 'kvmka.ru',
    utm: { source: 'felag', medium: 'referral', campaign: 'kvmka' },
  },
  reg_ru: {
    domain: 'reg.ru',
    utm: { source: 'felag', medium: 'referral', campaign: 'reg.ru' },
  },
  tbank: {
    domain: 'tbank.ru',
    utm: { source: 'felag', medium: 'referral', campaign: 'tbank' },
  },
  cloudtips: {
    domain: 'cloudtips.ru',
    utm: { source: 'felag', medium: 'donation', campaign: 'cloudtips' },
  },
} as const;

// Все домены партнёров для быстрого checks
export const PARTNER_DOMAINS = Object.values(PARTNERS).map((p) => p.domain);

/**
 * Получить конфиг партнёра по URL
 * Возвращает null, если домен не в списке партнёров
 */
export function getPartnerByUrl(url: string): PartnerEntry | null {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, '');
    return Object.values(PARTNERS).find((p) => hostname === p.domain) || null;
  } catch {
    return null;
  }
}
