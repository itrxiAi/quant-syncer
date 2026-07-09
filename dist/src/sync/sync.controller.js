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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncController = void 0;
const common_1 = require("@nestjs/common");
const sync_service_1 = require("./sync.service");
const auth_guard_1 = require("../auth/auth.guard");
let SyncController = class SyncController {
    syncService;
    constructor(syncService) {
        this.syncService = syncService;
    }
    async syncAShareSpot() {
        this.syncService.manualSyncAShare();
        return { status: 'accepted', message: 'ashare sync started in background' };
    }
    async syncCrypto() {
        return this.syncService.manualSyncCrypto();
    }
    async syncCalendar() {
        return this.syncService.manualSyncCalendar();
    }
};
exports.SyncController = SyncController;
__decorate([
    (0, common_1.Post)('sync-ashare-spot'),
    (0, common_1.UseGuards)(auth_guard_1.AdminGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SyncController.prototype, "syncAShareSpot", null);
__decorate([
    (0, common_1.Post)('sync-crypto'),
    (0, common_1.UseGuards)(auth_guard_1.AdminGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SyncController.prototype, "syncCrypto", null);
__decorate([
    (0, common_1.Post)('sync-calendar'),
    (0, common_1.UseGuards)(auth_guard_1.AdminGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SyncController.prototype, "syncCalendar", null);
exports.SyncController = SyncController = __decorate([
    (0, common_1.Controller)('v1/admin'),
    __metadata("design:paramtypes", [sync_service_1.SyncService])
], SyncController);
//# sourceMappingURL=sync.controller.js.map