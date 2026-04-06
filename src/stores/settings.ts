import { persistentMap } from '@nanostores/persistent';

// nanostores persistentMap requires all values to be strings
export const settingsStore = persistentMap<Record<string, string>>('site_settings:', {
    logoUrl: '/favicon.svg',
    footerLocation: 'Calle Principal 123, Ciudad de México',
    whatsappPhone: '1234567890',
    attentionSchedule: '8:00 AM - 6:00 PM',
    isAttentionVisible: 'true',
    isClosedToday: 'false',
    contactEmail: 'soporte@digitalcenter.com',
    promoModalEnabled: 'false',
    promoModalDuration: 'session'
});
