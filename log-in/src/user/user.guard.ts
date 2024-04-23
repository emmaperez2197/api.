import {BadGatewayException, CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import {  InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import {  Model } from 'mongoose';
import { User } from './entities/user.entity';
import { UserMesssage } from './messages/user-messages';

@Injectable()
export class UserGuard implements CanActivate {

  logger = new Logger()
  
  constructor(
    @InjectModel(User.name) private userModel : Model<User>,
    private readonly jwtService: JwtService
  ){}

  async canActivate(
    context: ExecutionContext,
  ):Promise<boolean>{

    try {

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
  
    if (!token) {
      throw new UnauthorizedException();
    }

      const payload = await this.jwtService.verify(token, {
        secret: process.env.SECRET_KEY,
      });



      const user = await this.userModel.findById(payload.sub)
         
      if (!user) {
        throw new BadGatewayException(UserMesssage.UserDoesNotExist);
      }

      request.user = payload;
      
      return true;

    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException(UserMesssage.TokenExpired);
      }

      this.logger.log(error)
      throw error;
    }
  }

  private extractTokenFromHeader(request: Request) {

    if(!request.headers?.authorization){
        throw new UnauthorizedException(  )
    }

    const [type, token] = request.headers?.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}

