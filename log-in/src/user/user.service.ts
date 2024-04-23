import { BadGatewayException, Inject, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Connection, Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { IUser } from './interfaces/user';
import { comparePassword } from './utils/bcrypt';
import { ClientProxy } from '@nestjs/microservices';
import { UserMesssage } from './messages/user-messages';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { template } from 'src/nodemailer/templates/template';

@Injectable()
export class UserService {

  logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name) private userModel : Model<User>,

    @Inject('BUSINESS_SERVICE') private businessService: ClientProxy,

    private  readonly jwtTokenService: JwtService,

    private readonly nodemailerService: NodemailerService,
    
    @InjectConnection() private connection: Connection
  ){}
  async create(createUserDto: CreateUserDto) {
    try {

      const {email} = createUserDto

      const checkEmailNotExist =  await this.userModel.find({email})
      
      if (!checkEmailNotExist) {
        throw new  UnauthorizedException(UserMesssage.EmailAlreadyExists)
      }

      const createdUser = new this.userModel(createUserDto)

      
      await createdUser.save()
      await this.nodemailerService.sendEmail(email, template())
      
      return {
        message: UserMesssage.UserCreatedSuccessfully
      }
    
    } catch (error) {
    
      this.logger.error(error)
    throw new InternalServerErrorException(error)
    }

  }


  async validateCredentials(createDto: CreateUserDto) {

    try {
      const {email,password} = createDto;
  
      const user:IUser = await this.userModel.findOne({email});
  
      if (!user) {
        throw new BadGatewayException(UserMesssage.UserDoesNotExist)
      }
      
      const checkPassword = await comparePassword(password, user.password)

      if (!checkPassword) {
        throw new UnauthorizedException(UserMesssage.InvalidPassword)
      }

      return this.loginWithCredentials(user)

    } catch (error) {
      this.logger.log(error)
      throw new InternalServerErrorException(error)
    }

  }


  async listUsers(data){

    return await this.businessService.send('filter-user', data)
  
  }

  async loginWithCredentials(user: any): Promise<object> {

    const payload = { email: user.email, sub: user._id };

    return {
        access_token: this.jwtTokenService.sign(payload),
    };
}

};
