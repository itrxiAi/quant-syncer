"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGuard = exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const READ_KEYS = (process.env.QLIB_SYNC_API_KEYS || '').split(',').map(k => k.trim()).filter(Boolean);
const ADMIN_KEYS = (process.env.QLIB_SYNC_ADMIN_KEYS || '').split(',').map(k => k.trim()).filter(Boolean);
let AuthGuard = class AuthGuard {
    canActivate(context) {
        const key = context.switchToHttp().getRequest().headers['x-api-key'];
        if (!key || !([...READ_KEYS, ...ADMIN_KEYS].includes(key))) {
            throw new common_1.UnauthorizedException('invalid or missing X-API-Key');
        }
        return true;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)()
], AuthGuard);
let AdminGuard = class AdminGuard {
    canActivate(context) {
        const key = context.switchToHttp().getRequest().headers['x-api-key'];
        if (!key || !ADMIN_KEYS.includes(key)) {
            throw new common_1.ForbiddenException('admin scope required');
        }
        return true;
    }
};
exports.AdminGuard = AdminGuard;
exports.AdminGuard = AdminGuard = __decorate([
    (0, common_1.Injectable)()
], AdminGuard);
//# sourceMappingURL=auth.guard.js.map