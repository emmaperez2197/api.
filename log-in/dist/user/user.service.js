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
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_entity_1 = require("./entities/user.entity");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("./utils/bcrypt");
const microservices_1 = require("@nestjs/microservices");
const user_messages_1 = require("./messages/user-messages");
const nodemailer_service_1 = require("../nodemailer/nodemailer.service");
const template_1 = require("../nodemailer/templates/template");
let UserService = UserService_1 = class UserService {
    constructor(userModel, businessService, jwtTokenService, nodemailerService, connection) {
        this.userModel = userModel;
        this.businessService = businessService;
        this.jwtTokenService = jwtTokenService;
        this.nodemailerService = nodemailerService;
        this.connection = connection;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    async create(createUserDto) {
        try {
            const { email } = createUserDto;
            const checkEmailNotExist = await this.userModel.find({ email });
            if (!checkEmailNotExist) {
                throw new common_1.UnauthorizedException(user_messages_1.UserMesssage.EmailAlreadyExists);
            }
            const createdUser = new this.userModel(createUserDto);
            await createdUser.save();
            await this.nodemailerService.sendEmail(email, (0, template_1.template)());
            return {
                message: user_messages_1.UserMesssage.UserCreatedSuccessfully
            };
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async validateCredentials(createDto) {
        try {
            const { email, password } = createDto;
            const user = await this.userModel.findOne({ email });
            if (!user) {
                throw new common_1.BadGatewayException(user_messages_1.UserMesssage.UserDoesNotExist);
            }
            const checkPassword = await (0, bcrypt_1.comparePassword)(password, user.password);
            if (!checkPassword) {
                throw new common_1.UnauthorizedException(user_messages_1.UserMesssage.InvalidPassword);
            }
            return this.loginWithCredentials(user);
        }
        catch (error) {
            this.logger.log(error);
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async listUsers(data) {
        return await this.businessService.send('filter-user', data);
    }
    async loginWithCredentials(user) {
        const payload = { email: user.email, sub: user._id };
        return {
            access_token: this.jwtTokenService.sign(payload),
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __param(1, (0, common_1.Inject)('BUSINESS_SERVICE')),
    __param(4, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Model,
        microservices_1.ClientProxy,
        jwt_1.JwtService,
        nodemailer_service_1.NodemailerService,
        mongoose_2.Connection])
], UserService);
;
//# sourceMappingURL=user.service.js.map