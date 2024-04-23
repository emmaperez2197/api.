import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
// import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { VerifyEmailMiddleware } from './user/middlewares/veriftyEmail.middleware';
import { NodemailerService } from './nodemailer/nodemailer.service';


const {DATABASE_NAME, DATABASE_HOST, DATABASE_PORT} = process.env;

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot( `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`),
    UserModule
  ],
  controllers: [],
  providers: [NodemailerService],
})
export class AppModule  implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
     .apply(VerifyEmailMiddleware)
     .forRoutes( {path: 'user/create', method: RequestMethod.POST });
  } 
}
