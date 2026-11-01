import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  // pathname is /[lang]/...
  // index 0: "", index 1: "[lang]"
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function useTranslatedPath(lang: keyof typeof ui) {
  return function translatePath(path: string, l: string = lang) {
    const base = import.meta.env.BASE_URL.endsWith('/') 
      ? import.meta.env.BASE_URL 
      : import.meta.env.BASE_URL + '/';
    
    let cleanPath = path.startsWith('/') ? path.slice(1) : path;
    
    // Разделяем путь и query-параметры — слэш добавляем ТОЛЬКО к пути
    const queryIndex = cleanPath.indexOf('?');
    const pathPart = queryIndex >= 0 ? cleanPath.slice(0, queryIndex) : cleanPath;
    const queryPart = queryIndex >= 0 ? cleanPath.slice(queryIndex) : '';
    
    // Добавляем слэш только к pathPart, если он не пустой и не заканчивается на /
    const suffix = pathPart && !pathPart.endsWith('/') ? '/' : '';
    
    return `${base}${l}/${pathPart}${suffix}${queryPart}`;
  }
}
