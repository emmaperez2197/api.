
import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import { Connection } from 'mongoose';

@Injectable()
export class VerifyEmailMiddleware implements NestMiddleware {

    constructor(
        @InjectConnection() private connection: Connection
    ) { }
    async use(req: Request, res: Response, next: NextFunction) {


        try {

            const user = await  this.connection.collection('users').find({ email: req.body.email }).toArray();
        
            if (user.length !== 0) {
                return res.status(400).json({
                    message: 'The email is in use, try another please'
                })

            }

        } catch (error) {
            throw error
        }

        next();
    }
}
