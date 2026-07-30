import { Role, StoredUser } from './auth';

/**
 * Lets the whole app be explored in a browser with no backend running.
 * Mirrors backend/src/database/seed.ts so the same credentials work in
 * both places once the API is connected.
 */
export const DEMO_USERS: (StoredUser & { password: string })[] = [
  { fullName: 'Jordan Ade', email: 'student@learnsphere.dev', password: 'password123', role: 'student' },
  { fullName: 'Amara Chukwu', email: 'instructor@learnsphere.dev', password: 'password123', role: 'instructor' },
  { fullName: 'Platform Admin', email: 'admin@learnsphere.dev', password: 'password123', role: 'admin' },
];

export function findDemoUser(email: string, password: string) {
  return (
    DEMO_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
    ) || null
  );
}

/** `fetch` throws a TypeError for network failures (server unreachable, CORS, etc.). */
export function isNetworkError(err: unknown): boolean {
  return err instanceof TypeError;
}

export function fakeTokens() {
  const stamp = Date.now().toString(36);
  return { accessToken: `demo-${stamp}`, refreshToken: `demo-refresh-${stamp}` };
}

export function roleFromSignup(fullName: string, email: string, role: Role): StoredUser {
  return { fullName, email, role };
}
