"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("./user/user.module");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const veriftyEmail_middleware_1 = require("./user/middlewares/veriftyEmail.middleware");
const nodemailer_service_1 = require("./nodemailer/nodemailer.service");
const { DATABASE_NAME, DATABASE_HOST, DATABASE_PORT } = process.env;
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(veriftyEmail_middleware_1.VerifyEmailMiddleware)
            .forRoutes({ path: 'user/create', method: common_1.RequestMethod.POST });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRoot(`mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`),
            user_module_1.UserModule
        ],
        controllers: [],
        providers: [nodemailer_service_1.NodemailerService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map