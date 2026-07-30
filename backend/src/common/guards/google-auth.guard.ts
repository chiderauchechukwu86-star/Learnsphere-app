import { ExecutionContext, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { isGoogleOAuthConfigured } from '../../config/google-oauth.config';

/**
 * Wraps the standard `AuthGuard('google')` so that hitting /auth/google when
 * no credentials are configured returns a clear 503 instead of a raw
 * "Unknown authentication strategy" error (or crashing the app, which is
 * what happens if GoogleStrategy is instantiated with an empty clientID).
 */
@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  canActivate(context: ExecutionContext) {
    if (!isGoogleOAuthConfigured()) {
      throw new ServiceUnavailableException(
        'Google OAuth is not configured on this server. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env to enable it.',
      );
    }
    return super.canActivate(context);
  }
}
