/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Connection, Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { UserMesssage } from './messages/user-messages';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
export declare class UserService {
    private userModel;
    private businessService;
    private readonly jwtTokenService;
    private readonly nodemailerService;
    private connection;
    logger: Logger;
    constructor(userModel: Model<User>, businessService: ClientProxy, jwtTokenService: JwtService, nodemailerService: NodemailerService, connection: Connection);
    create(createUserDto: CreateUserDto): Promise<{
        message: UserMesssage;
    }>;
    validateCredentials(createDto: CreateUserDto): Promise<object>;
    listUsers(data: any): Promise<import("rxjs").Observable<any>>;
    loginWithCredentials(user: any): Promise<object>;
}
