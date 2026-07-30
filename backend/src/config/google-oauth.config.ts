/**
 * Google OAuth is optional. Both the strategy registration (AuthModule) and
 * the route guard (GoogleAuthGuard) check this before touching passport, so
 * the app boots fine with JWT-only auth and Google login turns on by itself
 * the next time the server starts after these are set.
 */
export function isGoogleOAuthConfigured(): boolean {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}
