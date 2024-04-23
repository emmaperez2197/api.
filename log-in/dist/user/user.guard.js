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
exports.UserGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_entity_1 = require("./entities/user.entity");
const user_messages_1 = require("./messages/user-messages");
let UserGuard = class UserGuard {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger();
    }
    async canActivate(context) {
        try {
            const request = context.switchToHttp().getRequest();
            const token = this.extractTokenFromHeader(request);
            if (!token) {
                throw new common_1.UnauthorizedException();
            }
            const payload = await this.jwtService.verify(token, {
                secret: process.env.SECRET_KEY,
            });
            const user = await this.userModel.findById(payload.sub);
            if (!user) {
                throw new common_1.BadGatewayException(user_messages_1.UserMesssage.UserDoesNotExist);
            }
            request.user = payload;
            return true;
        }
        catch (error) {
            if (error instanceof jwt_1.TokenExpiredError) {
                throw new common_1.UnauthorizedException(user_messages_1.UserMesssage.TokenExpired);
            }
            this.logger.log(error);
            throw error;
        }
    }
    extractTokenFromHeader(request) {
        if (!request.headers?.authorization) {
            throw new common_1.UnauthorizedException();
        }
        const [type, token] = request.headers?.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }
};
exports.UserGuard = UserGuard;
exports.UserGuard = UserGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], UserGuard);
//# sourceMappingURL=user.guard.js.map