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
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './book.entity';
import { FindOneOptions } from 'typeorm';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  findAll(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: FindOneOptions<Book>): Promise<Book> {
    return this.bookService.findOne(id);
  }

  @Post()
  createOne(@Body() book: CreateBookDto): Promise<Book> {
    return this.bookService.createOne(book);
  }

  @Put(':id')
  updateOne(
    @Param('id') id: FindOneOptions<Book>,
    @Body() book: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.update(id, book);
  }

  @Patch(':id')
  updateShelf(
    @Param('id') id: FindOneOptions<Book>,
    @Body() book: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.updateShelf(id, book);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: FindOneOptions<Book>): Promise<void> {
    return this.bookService.delete(id);
  }
}
