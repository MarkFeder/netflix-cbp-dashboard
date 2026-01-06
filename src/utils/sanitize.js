import DOMPurify from 'dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks
 * @param {string} dirty - Unsafe HTML string
 * @returns {string} Sanitized HTML string
 */
export const sanitizeHTML = (dirty) => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'title'],
  });
};

/**
 * Sanitize text input by removing HTML tags and dangerous characters
 * @param {string} input - User input string
 * @returns {string} Sanitized string
 */
export const sanitizeText = (input) => {
  if (typeof input !== 'string') {
    return '';
  }

  // Remove HTML tags
  const stripped = input.replace(/<[^>]*>/g, '');

  // Remove potentially dangerous characters
  const sanitized = stripped
    .replace(/[<>]/g, '')
    .trim();

  return sanitized;
};

/**
 * Sanitize object properties
 * @param {Object} obj - Object with string properties
 * @param {Array<string>} fields - Fields to sanitize
 * @returns {Object} Object with sanitized fields
 */
export const sanitizeObject = (obj, fields) => {
  const sanitized = { ...obj };

  fields.forEach((field) => {
    if (typeof sanitized[field] === 'string') {
      sanitized[field] = sanitizeText(sanitized[field]);
    }
  });

  return sanitized;
};

/**
 * Validate and sanitize URL
 * @param {string} url - URL to validate
 * @returns {string|null} Sanitized URL or null if invalid
 */
export const sanitizeURL = (url) => {
  try {
    const parsed = new URL(url);
    // Only allow http and https protocols
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
};

/**
 * Escape special characters for use in HTML
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
export const escapeHTML = (str) => {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};
