export function createCompositeKey(str1: string, str2: string): string {
    return `${str1}~~${str2}`;
};

export function breakdownCompositeKey(key: string): { str1: string, str2: string } {
    const [str1, str2] = key.split('~~');
    return { str1, str2 };
}