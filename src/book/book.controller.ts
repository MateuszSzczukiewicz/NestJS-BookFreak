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

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  findAll(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Book> {
    return this.bookService.findOne(id);
  }

  @Post()
  createOne(@Body() book: BookDto): Promise<Book> {
    return this.bookService.createOne(book);
  }

  @Put(':id')
  updateOne(
    @Param('id') id: number,
    @Body() book: BookDto,
  ): Promise<UpdateResult> {
    return this.bookService.update(id, book);
  }

  @Patch(':id')
  updateShelf(
    @Param('id') id: number,
    @Body('bookShelf') bookShelf: BookShelvesEnum,
  ): Promise<UpdateResult> {
    return this.bookService.updateShelf(id, bookShelf);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number): Promise<Book> {
    return this.bookService.delete(id);
  }
}
