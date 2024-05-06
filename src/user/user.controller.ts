import { Controller, Post, Param, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(':userId/books/:bookId')
  async assignBookToUser(
    @Param('userId') userId: number,
    @Param('bookId') bookId: number,
  ) {
    return this.userService.assignBookToUser(userId, bookId);
  }

  @Get(':userId/books')
  async getBooksOfUser(@Param('userId') userId: number) {
    return this.userService.getBooksOfUser(userId);
  }
}
