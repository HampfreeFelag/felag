import { defineMiddleware } from 'astro:middleware';

// SET TO true TO ENABLE MAINTENANCE MODE GLOBALLY
const MAINTENANCE_MODE = true;

export const onRequest = defineMiddleware(async (context, next) => {
  if (MAINTENANCE_MODE && !context.url.pathname.includes('/maintenance')) {
    // Standard response for maintenance
    return context.redirect('/maintenance');
  }
  
  return next();
});
