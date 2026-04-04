import { persistentAtom } from '@nanostores/persistent';

// Un persistentAtom guarda automáticamente el valor en el localStorage del navegador
export const tokenStore = persistentAtom<string | null>('auth_token', null);

export function logout() {
    tokenStore.set(null);
    window.location.href = '/login';
}
