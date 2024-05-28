import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto } from './dto/book.dto';
import { Book } from './book.entity';
import { UpdateResult } from 'typeorm';
import { BookShelvesEnum } from './enums/book.enum';

@Controller('profile/:userId/books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async findAll(@Param('userId') userId: number): Promise<Book[]> {
    return this.bookService.findAll(userId);
  }

  @Get(':id')
  findOne(
    @Param('userId') userId: number,
    @Param('id') id: number,
  ): Promise<Book> {
    return this.bookService.findOne(userId, id);
  }

  @Post()
  createOne(
    @Param('userId') userId: number,
    @Body() createBookDto: BookDto,
  ): Promise<Book> {
    return this.bookService.createOne(createBookDto, userId);
  }

  @Put(':id')
  async updateOne(
    @Param('userId') userId: number,
    @Param('id') id: number,
    @Body() bookDto: BookDto,
  ): Promise<UpdateResult> {
    return this.bookService.updateOne(userId, id, bookDto);
  }

  @Patch(':id')
  updateShelf(
    @Param('userId') userId: number,
    @Param('id') id: number,
    @Body('bookShelf') bookShelf: BookShelvesEnum,
  ): Promise<UpdateResult> {
    return this.bookService.updateShelf(userId, id, bookShelf);
  }

  @Delete(':id')
  async deleteOne(
    @Param('userId') userId: number,
    @Param('id') id: number,
  ): Promise<void> {
    await this.bookService.deleteOne(userId, id);
  }
}
