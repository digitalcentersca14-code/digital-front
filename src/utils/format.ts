/**
 * Formatea un número como precio con puntos para los miles y comas para los decimales.
 * Ejemplo: 1234.56 -> 1.234,56
 */
export const formatPrice = (price: number | string | null | undefined): string => {
    if (price === null || price === undefined) return '0,00';
    
    // Asegurarse de que sea un número
    const num = typeof price === 'string' ? parseFloat(price) : price;
    
    if (isNaN(num)) return '0,00';

    return new Intl.NumberFormat('de-DE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(num);
};
