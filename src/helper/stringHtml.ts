/**
 * Menghilangkan semua tag HTML dari string
 * @param html - String yang mengandung HTML
 * @returns String tanpa tag HTML
 */
export function stripHtmlTags(html: string): string {
  if (!html) return '';
  
  // Remove HTML tags using regex
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Decode HTML entities seperti &nbsp;, &amp;, &lt;, &gt;, dll
 * @param text - String yang mengandung HTML entities
 * @returns String dengan entities yang di-decode
 */
export function decodeHtmlEntities(text: string): string {
  if (!text) return '';
  
  const entities: Record<string, string> = {
    '&nbsp;': ' ',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&cent;': '¢',
    '&pound;': '£',
    '&yen;': '¥',
    '&euro;': '€',
    '&copy;': '©',
    '&reg;': '®',
  };

  let decoded = text;
  
  // Replace named entities
  Object.keys(entities).forEach(entity => {
    decoded = decoded.replace(new RegExp(entity, 'g'), entities[entity]);
  });
  
  // Replace numeric entities (&#123; or &#xAB;)
  decoded = decoded.replace(/&#(\d+);/g, (match, dec) => {
    return String.fromCharCode(dec);
  });
  
  decoded = decoded.replace(/&#x([0-9A-Fa-f]+);/g, (match, hex) => {
    return String.fromCharCode(parseInt(hex, 16));
  });
  
  return decoded;
}

/**
 * Convert HTML ke plain text (menghilangkan tag dan decode entities)
 * Khusus untuk output dari Tiptap editor
 * @param html - String HTML dari Tiptap
 * @returns Plain text
 */
export function htmlToPlainText(html: string): string {
  if (!html) return '';
  
  let text = html;
  
  // Replace <br>, <br/>, <br /> dengan newline
  text = text.replace(/<br\s*\/?>/gi, '\n');
  
  // Replace </p>, </div>, </li> dengan newline
  text = text.replace(/<\/(p|div|li|h[1-6])>/gi, '\n');
  
  // Replace <li> dengan bullet point
  text = text.replace(/<li>/gi, '\n• ');
  
  // Remove all other HTML tags
  text = stripHtmlTags(text);
  
  // Decode HTML entities
  text = decodeHtmlEntities(text);
  
  // Clean up multiple newlines
  text = text.replace(/\n{3,}/g, '\n\n');
  
  // Clean up multiple spaces
  text = text.replace(/ {2,}/g, ' ');
  
  // Trim whitespace from each line
  text = text.split('\n').map(line => line.trim()).join('\n');
  
  // Trim overall
  text = text.trim();
  
  return text;
}

/**
 * Truncate plain text dari HTML dengan limit karakter
 * @param html - String HTML
 * @param maxLength - Maximum panjang karakter
 * @param suffix - Suffix yang ditambahkan jika di-truncate (default: '...')
 * @returns Plain text yang sudah di-truncate
 */
export function truncateHtmlText(html: string, maxLength: number, suffix: string = '...'): string {
  const plainText = htmlToPlainText(html);
  
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  return plainText.substring(0, maxLength - suffix.length).trim() + suffix;
}

/**
 * Sanitize HTML untuk preview yang aman (remove script, style, dll)
 * @param html - String HTML
 * @returns Sanitized HTML
 */
export function sanitizeHtml(html: string): string {
  if (!html) return '';
  
  let sanitized = html;
  
  // Remove script tags
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove style tags
  sanitized = sanitized.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  
  // Remove event handlers
  sanitized = sanitized.replace(/on\w+="[^"]*"/gi, '');
  sanitized = sanitized.replace(/on\w+='[^']*'/gi, '');
  
  // Remove javascript: protocol
  sanitized = sanitized.replace(/javascript:/gi, '');
  
  return sanitized;
}

/**
 * Extract text dari HTML menggunakan DOM Parser (hanya untuk client-side/browser)
 * Lebih akurat tapi hanya bisa digunakan di browser
 * @param html - String HTML
 * @returns Plain text
 */
export function extractTextFromHtml(html: string): string {
  if (!html) return '';
  
  // Check if we're in browser environment
  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
    // Fallback to regex-based method
    return htmlToPlainText(html);
  }
  
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  } catch (error) {
    // Fallback to regex-based method
    return htmlToPlainText(html);
  }
}

/**
 * Remove empty HTML tags (tags tanpa content)
 * @param html - String HTML
 * @returns HTML tanpa empty tags
 */
export function removeEmptyTags(html: string): string {
  if (!html) return '';
  
  let cleaned = html;
  let previousLength = 0;
  
  // Loop until no more empty tags found
  while (cleaned.length !== previousLength) {
    previousLength = cleaned.length;
    // Remove empty tags like <p></p>, <div></div>, <span></span>, etc
    cleaned = cleaned.replace(/<(\w+)(\s[^>]*)?>(\s|&nbsp;)*<\/\1>/gi, '');
  }
  
  return cleaned;
}
