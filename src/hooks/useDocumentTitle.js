import { useEffect } from 'react';

const SITE_NAME = 'Marlowe & Quay';

// Sets the browser tab title for the current page.
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  }, [title]);
}
