/**
 * GA4 Event Tracking for Partner Links
 * Sends events using beacon transport for reliability
 */

const GA_MEASUREMENT_ID =
  (typeof window !== 'undefined' && (window as any).GA_MEASUREMENT_ID) ||
  'G-XXXXXXXXXX';

/**
 * Отправить событие в GA4 с использованием beacon transport
 * Beacon гарантирует отправку даже при выгрузке страницы
 */
function sendGAEvent(eventName: string, params: Record<string, string | number>) {
  if (typeof window === 'undefined') return;
  const gtag = (window as any).gtag;
  if (!gtag) return;

  gtag('event', eventName, {
    ...params,
    transport_type: 'beacon',
  });
}

/**
 * Отслеживание клика по партнерской ссылке
 * @param partnerName — имя партнера (veles, kvmka, tbank, reg.ru, cloudtips)
 * @param destinationUrl — полный URL, на который ведет ссылка
 */
export function trackPartnerClick(partnerName: string, destinationUrl: string) {
  sendGAEvent('partner_link_click', {
    partner_name: partnerName,
    destination_url: destinationUrl,
    page_location: window.location.pathname,
  });
}

/**
 * Сгенерировать onclick handler для партнерской ссылки
 * Возвращает строку для вставки в Astro template
 */
export function getPartnerClickHandler(partnerName: string, url: string): string {
  return `trackPartnerClick('${partnerName}', '${url}');`;
}
