// Utility function to format numbers as Nigerian Naira
export function formatNaira(amount) {
    if (isNaN(amount)) return '₦0';
    return `₦${Number(amount).toLocaleString('en-NG', { minimumFractionDigits: 0 })}`;
}
