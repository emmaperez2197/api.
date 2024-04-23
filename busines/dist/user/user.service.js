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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_entity_1 = require("./entities/user.entity");
let UserService = class UserService {
    constructor(connection, userModel) {
        this.connection = connection;
        this.userModel = userModel;
        this.logger = new common_1.Logger();
    }
    async handler(email, offset = 0, limit = 10) {
        try {
            const regex = new RegExp(email, 'i');
            const users = await this.userModel
                .find({ email: regex })
                .skip(offset)
                .limit(limit);
            const documentsTotal = await this.userModel.countDocuments({
                email: regex,
            });
            return {
                data: users,
                offset: offset,
                limit: limit,
                total: documentsTotal,
            };
        }
        catch (error) {
            this.handlerErrorBadRequest(error);
        }
    }
    handlerErrorBadRequest(error) {
        if (error.status === 400) {
            this.logger.log(error);
            throw error;
        }
        else {
            this.logger.error(error);
            throw error(error);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectConnection)()),
    __param(1, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Connection,
        mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map