import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserGuard } from './user.guard';
import { PaginationDto } from './dto/pagination-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  logIn(@Body() createUserDto: CreateUserDto){
    return this.userService.validateCredentials(createUserDto);
  }


  @UseGuards(UserGuard)
  @Get('list')
  get(@Query() pagitationDto?:PaginationDto){
    return this.userService.listUsers(pagitationDto)
  }

}
