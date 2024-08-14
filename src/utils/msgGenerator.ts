/**
 * Converts an array of camelCase strings to normal case.
 * @param {string[]} values - Array of camelCase strings to convert.
 * @returns {string[]} Array of strings converted to normal case.
 */
export function camelCaseToNormalCase(values: string[] = []): string[] {
    const result = values.map((v) => v.replace(/([A-Z])/g, ' $1').trim());
    const finalResult = result.map((r) => r.charAt(0).toUpperCase() + r.slice(1));
    return finalResult;
}

/**
 * Generates a message indicating the required fields not received.
 * @param {string[]} required - Array of required field names.
 * @param {string[]} received - Array of received field names.
 * @returns {string | undefined} Message indicating the missing required fields, or undefined if all required fields are received.
 */
export function generateMessage(required: string[] = [], received: string[] = []): string | undefined {
    required = Array.from(required);
    received = Object.keys(received);
    let missingFields = new Set<string>([]);
    required.forEach((r) => {
        if (!(r in received)) missingFields.add(r);
    });
    const missingFieldArray = Array.from(missingFields);
    if (!missingFieldArray.length) return undefined;
    const result = camelCaseToNormalCase(missingFieldArray);
    const message = result.length
        ? result.join(', ') + ' are Required.'
        : result.join('') + ' is Required.';
    return message;
}
