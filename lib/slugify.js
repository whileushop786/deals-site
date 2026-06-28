// Convert product title to URL-friendly slug
// e.g. "Anker 65W USB-C Fast Charger!" → "anker-65w-usb-c-fast-charger"
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')       // spaces/underscores → dash
    .replace(/[^\w-]+/g, '')       // remove special chars
    .replace(/--+/g, '-')          // multiple dashes → single
    .replace(/^-+|-+$/g, '')       // trim leading/trailing dashes
    .substring(0, 80);             // max 80 chars for clean URLs
}
