"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const prisma_service_1 = require("../prisma/prisma.service");
let CalendarController = class CalendarController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async calendar(asset = 'ashare', start, end) {
        const where = { asset: asset };
        if (start || end) {
            where.date = {};
            if (start)
                where.date.gte = new Date(start);
            if (end)
                where.date.lte = new Date(end);
        }
        const rows = await this.prisma.calendar.findMany({
            where,
            orderBy: { date: 'asc' },
        });
        return {
            asset,
            n: rows.length,
            grid: rows.map((r) => r.date.toISOString().slice(0, 10)),
        };
    }
};
exports.CalendarController = CalendarController;
__decorate([
    (0, common_1.Get)('calendar'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Query)('asset')),
    __param(1, (0, common_1.Query)('start')),
    __param(2, (0, common_1.Query)('end')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], CalendarController.prototype, "calendar", null);
exports.CalendarController = CalendarController = __decorate([
    (0, common_1.Controller)('v1'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CalendarController);
//# sourceMappingURL=calendar.controller.js.map