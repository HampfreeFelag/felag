/**
 * Утилита для управления ссылками
 * Единый подход к обработке внутренних, внешних и партнёрских ссылок
 */

import { PARTNER_DOMAINS, getPartnerByUrl } from '../config/partners';

const SITE_HOST = 'felag.online';

export type LinkAttrs = {
  href: string;
  target?: '_blank';
  rel?: string;
  ariaLabel?: string;
};

/**
 * Определить, является ли ссылка внутренней
 */
function isInternal(url: string): boolean {
  // Относительные ссылки — всегда внутренние
  if (!url.startsWith('http')) return true;

  try {
    const hostname = new URL(url).hostname.replace(/^www\./, '');
    return hostname === SITE_HOST || hostname.endsWith(`.${SITE_HOST}`);
  } catch {
    return false;
  }
}

/**
 * Добавить UTM-параметры к URL
 */
function addUtm(url: string, utm: { source: string; medium: string; campaign: string }): string {
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set('utm_source', utm.source);
    urlObj.searchParams.set('utm_medium', utm.medium);
    urlObj.searchParams.set('utm_campaign', utm.campaign);
    return urlObj.toString();
  } catch {
    return url;
  }
}

/**
 * Получить атрибуты для ссылки
 * @param url - URL ссылки
 * @param isPartner - флаг партнёрской ссылки (автоматически определяется по домену, можно переопределить)
 */
export function getLinkAttrs(url: string, isPartner?: boolean): LinkAttrs {
  // Внутренние ссылки — без изменений
  if (isInternal(url)) {
    return { href: url };
  }

  // Определяем партнёрский домен
  const partner = isPartner ? null : getPartnerByUrl(url);

  if (partner) {
    // Партнёрская ссылка — добавляем UTM и sponsored rel
    const finalUrl = addUtm(url, partner.utm);
    return {
      href: finalUrl,
      target: '_blank',
      rel: 'noopener noreferrer nofollow sponsored',
      ariaLabel: 'Партнёрская ссылка, откроется в новой вкладке',
    };
  }

  // Обычная внешняя ссылка
  return {
    href: url,
    target: '_blank',
    rel: 'noopener noreferrer',
    ariaLabel: 'Откроется в новой вкладке',
  };
}

/**
 * Проверить, является ли ссылка партнёрской
 */
export function isPartnerLink(url: string): boolean {
  return getPartnerByUrl(url) !== null;
}
