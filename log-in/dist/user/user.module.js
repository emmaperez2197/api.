"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const user_entity_1 = require("./entities/user.entity");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const microservices_1 = require("@nestjs/microservices");
const nodemailer_service_1 = require("../nodemailer/nodemailer.service");
const { SECRET_KEY, TOKEN_EXPIRATION } = process.env;
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                global: true,
                secret: SECRET_KEY,
                signOptions: { expiresIn: TOKEN_EXPIRATION }
            }),
            mongoose_1.MongooseModule.forFeature([{
                    name: user_entity_1.User.name, schema: user_entity_1.UserSchema
                },
            ]),
            microservices_1.ClientsModule.register([
                { name: 'BUSINESS_SERVICE', transport: microservices_1.Transport.TCP },
            ]),
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, nodemailer_service_1.NodemailerService],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map