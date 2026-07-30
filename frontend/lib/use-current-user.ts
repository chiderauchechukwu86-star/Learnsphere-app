'use client';

import { useEffect, useState } from 'react';
import { getCurrentUser, StoredUser, AUTH_CHANGED_EVENT } from './auth';

/** Reads the session from localStorage and re-renders whenever it changes. */
export function useCurrentUser() {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setUser(getCurrentUser());
    sync();
    setReady(true);
    window.addEventListener(AUTH_CHANGED_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(AUTH_CHANGED_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  return { user, ready };
}
