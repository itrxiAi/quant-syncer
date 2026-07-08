import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';

const READ_KEYS = (process.env.QLIB_SYNC_API_KEYS || '').split(',').map(k => k.trim()).filter(Boolean);
const ADMIN_KEYS = (process.env.QLIB_SYNC_ADMIN_KEYS || '').split(',').map(k => k.trim()).filter(Boolean);

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const key = context.switchToHttp().getRequest().headers['x-api-key'] as string | undefined;
    if (!key || !([...READ_KEYS, ...ADMIN_KEYS].includes(key))) {
      throw new UnauthorizedException('invalid or missing X-API-Key');
    }
    return true;
  }
}

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const key = context.switchToHttp().getRequest().headers['x-api-key'] as string | undefined;
    if (!key || !ADMIN_KEYS.includes(key)) {
      throw new ForbiddenException('admin scope required');
    }
    return true;
  }
}
