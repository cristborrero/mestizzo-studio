/**
 * Escapes HTML characters to prevent XSS/HTML Injection.
 */
export function escapeHTML(str: string): string {
  const p = document.createElement('p');
  p.textContent = str;
  return p.innerHTML;
}

/**
 * Basic HTML escape function for server-side environments where DOM is not available.
 */
export function sanitizeString(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
