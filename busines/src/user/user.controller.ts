import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('filter-user')
  async handlerTest(data): Promise<any> {
    const { email, offset, limit } = data;

    return await this.userService.handler(email, offset, limit);
  }
}
