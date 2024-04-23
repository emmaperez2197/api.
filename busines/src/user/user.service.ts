import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  logger = new Logger();
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async handler(email?: string, offset = 0, limit = 10) {
    try {
      const regex = new RegExp(email, 'i');
      const users = await this.userModel
        .find({ email: regex })
        .skip(offset)
        .limit(limit);

      const documentsTotal = await this.userModel.countDocuments({
        email: regex,
      });
      return {
        data: users,
        offset: offset,
        limit: limit,
        total: documentsTotal,
      };
    } catch (error) {
      this.handlerErrorBadRequest(error);
    }
  }

  handlerErrorBadRequest(error) {
    if (error.status === 400) {
      this.logger.log(error);
      throw error;
    } else {
      this.logger.error(error);
      throw error(error);
    }
  }
}
