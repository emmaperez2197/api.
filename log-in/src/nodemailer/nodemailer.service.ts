
import { Injectable } from '@nestjs/common';
import * as nodemailer  from 'nodemailer';

const {KEY_NODEMAILER, EMAIL_NODEMAILER, SERVICE_EMAIL} = process.env


@Injectable()
export class NodemailerService {
    
    transporter = nodemailer.createTransport({
        service: SERVICE_EMAIL,
        secure: false,
        auth: {
          user: EMAIL_NODEMAILER, 
          pass: KEY_NODEMAILER,
        },
          tls:{
            rejectUnauthorized: false
          },
      });
      
        async sendEmail(to, html) {
          try {
            const emailSended = await this.transporter.sendMail({
              from: '"Welcome to the app" <noreply@example.com>',
              to,
              subject: "API CONEXA",
              html
            });
      
            return emailSended;
          } catch(error) {
            return error;
          }
        }
}
