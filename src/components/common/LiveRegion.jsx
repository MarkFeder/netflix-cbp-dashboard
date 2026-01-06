import { useEffect, useRef } from 'react';

/**
 * Live region for announcing dynamic content changes to screen readers
 */
export function LiveRegion({ message, politeness = 'polite' }) {
  const regionRef = useRef(null);

  useEffect(() => {
    if (message && regionRef.current) {
      // Clear and set message to ensure it's announced
      regionRef.current.textContent = '';
      setTimeout(() => {
        regionRef.current.textContent = message;
      }, 100);
    }
  }, [message]);

  return (
    <div
      ref={regionRef}
      role="status"
      aria-live={politeness}
      aria-atomic="true"
      className="sr-only"
    />
  );
}
