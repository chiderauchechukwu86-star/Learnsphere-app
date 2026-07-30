import { Logger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { isGoogleOAuthConfigured } from '../../config/google-oauth.config';

const logger = new Logger('AuthModule');
const googleEnabled = isGoogleOAuthConfigured();

if (googleEnabled) {
  logger.log('Google OAuth is configured — /auth/google is enabled.');
} else {
  logger.warn(
    'Google OAuth is not configured (GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET missing). ' +
      'JWT email/password auth still works. Set both env vars and restart to enable Google login.',
  );
}

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    // GoogleStrategy's constructor calls passport-google-oauth20's super(),
    // which throws immediately if clientID is empty — so it must never be
    // instantiated at all when credentials are missing, not just unused.
    ...(googleEnabled ? [GoogleStrategy] : []),
  ],
  exports: [AuthService],
})
export class AuthModule {}
