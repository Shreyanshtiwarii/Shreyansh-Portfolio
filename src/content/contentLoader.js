// ─────────────────────────────────────────────────────────────────────────────
// Shared content-file loader
// ─────────────────────────────────────────────────────────────────────────────
// Parses content.html once (module load time, not per-render/per-component)
// and exposes small helpers for pulling text/attribute/list values out of it
// by the same `data-field` / `data-list` / `data-item` attributes the file
// uses. Kept intentionally tiny and dependency-free -- no Context, no
// fetch, no async state -- so wiring a section to the content file never
// changes that section's render/animation timing.
//
// Only sections explicitly migrated import this file. Sections still on
// hardcoded data (Projects, Contact, etc.) are completely unaffected.
// ─────────────────────────────────────────────────────────────────────────────

// `?raw` makes Vite inline content.html as a plain string at build time --
// no network request, available synchronously on import.
import contentHtml from './content.html?raw';

const contentDoc = new DOMParser().parseFromString(contentHtml, 'text/html');

/** Trimmed text content of the first element matching `selector`, or ''. */
export const getText = (selector, root = contentDoc) =>
  root.querySelector(selector)?.textContent?.trim() ?? '';

/** Attribute value of the first element matching `selector`, or ''. */
export const getAttr = (selector, attr, root = contentDoc) =>
  root.querySelector(selector)?.getAttribute(attr) ?? '';

/** Trimmed text of every element matching `selector`, as an array. */
export const getTextList = (selector, root = contentDoc) =>
  Array.from(root.querySelectorAll(selector)).map((el) => el.textContent.trim());

/** All elements matching `selector`, for manual per-item extraction. */
export const getAll = (selector, root = contentDoc) =>
  Array.from(root.querySelectorAll(selector));

export default contentDoc;
