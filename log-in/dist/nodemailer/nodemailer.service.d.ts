import * as nodemailer from 'nodemailer';
export declare class NodemailerService {
    transporter: nodemailer.Transporter<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
    sendEmail(to: any, html: any): Promise<any>;
}
