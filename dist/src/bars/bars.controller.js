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
exports.BarsController = void 0;
const common_1 = require("@nestjs/common");
const bars_service_1 = require("./bars.service");
const auth_guard_1 = require("../auth/auth.guard");
let BarsController = class BarsController {
    barsService;
    constructor(barsService) {
        this.barsService = barsService;
    }
    async bars(asset = 'ashare', symbol, symbols, index, freq = 'd1', start, end, fields) {
        if (!symbol && !symbols && !index) {
            throw new common_1.BadRequestException('one of symbol, symbols, or index is required');
        }
        const syms = symbols ? symbols.split(',').map((s) => s.trim()).filter(Boolean) : undefined;
        const flds = fields ? fields.split(',').map((f) => f.trim()).filter(Boolean) : undefined;
        return this.barsService.findBars({
            asset: asset,
            symbol,
            symbols: syms,
            index,
            freq: freq,
            start,
            end,
            fields: flds,
        });
    }
    async symbols(asset = 'ashare', freq = 'd1') {
        return {
            asset,
            freq,
            symbols: await this.barsService.listSymbols(asset, freq),
        };
    }
    async latest(asset = 'ashare', freq = 'd1') {
        return this.barsService.listLatest(asset, freq);
    }
};
exports.BarsController = BarsController;
__decorate([
    (0, common_1.Get)('bars'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Query)('asset')),
    __param(1, (0, common_1.Query)('symbol')),
    __param(2, (0, common_1.Query)('symbols')),
    __param(3, (0, common_1.Query)('index')),
    __param(4, (0, common_1.Query)('freq')),
    __param(5, (0, common_1.Query)('start')),
    __param(6, (0, common_1.Query)('end')),
    __param(7, (0, common_1.Query)('fields')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], BarsController.prototype, "bars", null);
__decorate([
    (0, common_1.Get)('symbols'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Query)('asset')),
    __param(1, (0, common_1.Query)('freq')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BarsController.prototype, "symbols", null);
__decorate([
    (0, common_1.Get)('latest'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Query)('asset')),
    __param(1, (0, common_1.Query)('freq')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BarsController.prototype, "latest", null);
exports.BarsController = BarsController = __decorate([
    (0, common_1.Controller)('v1'),
    __metadata("design:paramtypes", [bars_service_1.BarsService])
], BarsController);
//# sourceMappingURL=bars.controller.js.map