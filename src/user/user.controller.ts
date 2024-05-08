import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findOne(): Promise<User> {
    return this.userService.findOne();
  }

  @Post()
  createOne(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.createOne(user);
  }
}
