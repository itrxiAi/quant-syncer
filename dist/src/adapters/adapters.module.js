"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdaptersModule = void 0;
const common_1 = require("@nestjs/common");
const binance_adapter_1 = require("./binance.adapter");
const akshare_adapter_1 = require("./akshare.adapter");
let AdaptersModule = class AdaptersModule {
};
exports.AdaptersModule = AdaptersModule;
exports.AdaptersModule = AdaptersModule = __decorate([
    (0, common_1.Module)({
        providers: [binance_adapter_1.BinanceAdapter, akshare_adapter_1.AkshareAdapter],
        exports: [binance_adapter_1.BinanceAdapter, akshare_adapter_1.AkshareAdapter],
    })
], AdaptersModule);
//# sourceMappingURL=adapters.module.js.map