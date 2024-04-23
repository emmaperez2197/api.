import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';

const {SECRET_KEY, TOKEN_EXPIRATION} = process.env;

@Module({
  imports: [
    ConfigModule.forRoot(),
      PassportModule,
      JwtModule.register({
        global: true,
        secret: SECRET_KEY,
        signOptions: {expiresIn: TOKEN_EXPIRATION}
      }),
    MongooseModule.forFeature([{
      name: User.name, schema: UserSchema
    },    
  ]),

  ClientsModule.register([
    { name: 'BUSINESS_SERVICE', transport: Transport.TCP },
  ]),
  ],
  controllers: [UserController],
  providers: [UserService ,  NodemailerService],
})
export class UserModule {}
