"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodemailerService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const { KEY_NODEMAILER, EMAIL_NODEMAILER, SERVICE_EMAIL } = process.env;
let NodemailerService = class NodemailerService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: SERVICE_EMAIL,
            secure: false,
            auth: {
                user: EMAIL_NODEMAILER,
                pass: KEY_NODEMAILER,
            },
            tls: {
                rejectUnauthorized: false
            },
        });
    }
    async sendEmail(to, html) {
        try {
            const emailSended = await this.transporter.sendMail({
                from: '"Welcome to the app" <noreply@example.com>',
                to,
                subject: "API CONEXA",
                html
            });
            return emailSended;
        }
        catch (error) {
            return error;
        }
    }
};
exports.NodemailerService = NodemailerService;
exports.NodemailerService = NodemailerService = __decorate([
    (0, common_1.Injectable)()
], NodemailerService);
//# sourceMappingURL=nodemailer.service.js.map