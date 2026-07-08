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
var AdminService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const akshare_adapter_1 = require("../adapters/akshare.adapter");
const client_1 = require("../../generated/prisma/client");
let AdminService = AdminService_1 = class AdminService {
    prisma;
    akshare;
    logger = new common_1.Logger(AdminService_1.name);
    constructor(prisma, akshare) {
        this.prisma = prisma;
        this.akshare = akshare;
    }
    async syncIndex(indexCode, indexSymbol, name) {
        this.logger.log(`syncing index ${indexCode} (${indexSymbol})...`);
        const constituents = await this.akshare.fetchIndexConstituents(indexSymbol);
        const newSymbols = new Set(constituents.map((c) => c.symbol));
        await this.prisma.index.upsert({
            where: { code: indexCode },
            create: { code: indexCode, name, asset: client_1.Asset.ashare },
            update: { name },
        });
        const today = new Date();
        const activeMembers = await this.prisma.indexMember.findMany({
            where: { indexCode, outDate: null },
        });
        let removed = 0;
        for (const m of activeMembers) {
            if (!newSymbols.has(m.symbol)) {
                await this.prisma.indexMember.update({
                    where: { indexCode_symbol_inDate: { indexCode, symbol: m.symbol, inDate: m.inDate } },
                    data: { outDate: today },
                });
                removed++;
            }
        }
        const activeSymbols = new Set(activeMembers.map((m) => m.symbol));
        let added = 0;
        for (const c of constituents) {
            if (activeSymbols.has(c.symbol))
                continue;
            await this.prisma.indexMember.upsert({
                where: { indexCode_symbol_inDate: { indexCode, symbol: c.symbol, inDate: new Date(c.inDate) } },
                create: { indexCode, symbol: c.symbol, inDate: new Date(c.inDate) },
                update: {},
            });
            added++;
        }
        this.logger.log(`syncIndex ${indexCode}: ${constituents.length} constituents, +${added} -${removed}`);
        return { indexCode, total: constituents.length, added, removed };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = AdminService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        akshare_adapter_1.AkshareAdapter])
], AdminService);
//# sourceMappingURL=admin.service.js.map