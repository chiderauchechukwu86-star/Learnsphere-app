export type Role = 'student' | 'instructor' | 'admin';

export interface StoredUser {
  fullName: string;
  email: string;
  role: Role;
}

const TOKEN_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';
const USER_KEY = 'authUser';
const AUTH_EVENT = 'learnsphere-auth-changed';

/** Persists a session (real or demo) and notifies any mounted auth hooks. */
export function saveSession(
  tokens: { accessToken: string; refreshToken: string },
  user: StoredUser,
) {
  localStorage.setItem(TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(REFRESH_KEY, tokens.refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function getCurrentUser(): StoredUser | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredUser;
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export const AUTH_CHANGED_EVENT = AUTH_EVENT;
