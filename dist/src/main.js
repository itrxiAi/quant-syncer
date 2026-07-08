"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const port = process.env.PORT ?? 8000;
    await app.listen(port);
    common_1.Logger.log(`qlib-syncer running on http://0.0.0.0:${port}`, 'Bootstrap');
}
bootstrap();
//# sourceMappingURL=main.js.map