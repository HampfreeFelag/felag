import { defineMiddleware } from 'astro:middleware';

// SET TO true TO ENABLE MAINTENANCE MODE GLOBALLY
// 2026-09-15: редизайн завершён локально, но НЕ выкатан — держим maintenance,
// пока не будет ревью на dev-сервере (npm run dev → localhost:4321).
const MAINTENANCE_MODE = true;

export const onRequest = defineMiddleware(async (context, next) => {
  if (MAINTENANCE_MODE && !context.url.pathname.includes('/maintenance')) {
    // Standard response for maintenance
    return context.redirect('/maintenance');
  }
  
  return next();
});
