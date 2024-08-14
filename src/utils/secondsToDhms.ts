/**
 * Converts a number of seconds into a string representation of days, hours, minutes, and seconds.
 * @param {number} seconds - Number of seconds to convert.
 * @returns {string} String representation of the time duration in the format "d days hr hours min minutes s seconds".
 */
export default function secondsToDhms(seconds: number): string {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor(seconds % (3600 * 24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);

    const dDisplay = d > 0 ? d + (d === 1 ? " day " : " days ") : "";
    const hDisplay = h > 0 ? h + (h === 1 ? " h " : " h ") : "";
    const mDisplay = m > 0 ? m + (m === 1 ? " m " : " m ") : "";
    const sDisplay = s > 0 ? s + (s === 1 ? " s" : " s") : "";

    return dDisplay + hDisplay + mDisplay + sDisplay;
}
