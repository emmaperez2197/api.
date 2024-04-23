"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.TCP,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ forbidNonWhitelisted: true, transform: true }));
    await app.listen();
    logger.log(`Running microservicio Business`);
    logger.log(`Microservice Business lifted`);
}
bootstrap();
//# sourceMappingURL=main.js.map