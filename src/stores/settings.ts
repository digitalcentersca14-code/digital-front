import { persistentMap } from '@nanostores/persistent';

interface Settings {
    logoUrl: string;
    footerLocation: string;
    whatsappPhone: string;
}

export const settingsStore = persistentMap<Settings>('site_settings', {
    logoUrl: '/favicon.svg', // logo por defecto en astro
    footerLocation: 'Calle Principal 123, Ciudad de México',
    whatsappPhone: '1234567890'
});
