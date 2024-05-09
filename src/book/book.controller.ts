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
import { UpdateResult } from 'typeorm';

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
  createOne(@Body() book: CreateBookDto): Promise<Book> {
    return this.bookService.createOne(book);
  }

  @Put(':id')
  updateOne(
    @Param('id') id: number,
    @Body() book: UpdateBookDto,
  ): Promise<UpdateResult> {
    return this.bookService.update(id, book);
  }

  @Patch(':id')
  updateShelf(
    @Param('id') id: number,
    @Body() book: UpdateBookDto,
  ): Promise<UpdateResult> {
    return this.bookService.updateShelf(id, book);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number): Promise<Book> {
    return this.bookService.delete(id);
  }
}
