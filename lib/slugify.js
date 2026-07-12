export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Generates slug with ID appended to ensure uniqueness
// Used for NEW deals only — existing deals keep their original slug
export function slugifyWithId(text, id) {
  return `${slugify(text)}-${id}`;
}
