import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

const { DATABASE_NAME, DATABASE_HOST, DATABASE_PORT } = process.env;

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`,
    ),
    ClientsModule.register([
      { name: 'BUSINESS_SERVICE', transport: Transport.TCP },
    ]),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
