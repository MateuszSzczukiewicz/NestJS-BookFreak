import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { BookShelvesEnum } from '../types/book.enum';
import { FindOneOptions } from 'typeorm';
import { Book } from './book.entity';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get()
  findOne(@Body('id') id: FindOneOptions<Book>) {
    return this.bookService.findOne(id);
  }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Put()
  update(@Body('id') id: string, updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @Patch()
  updateShelf(
    @Body() body: { id: FindOneOptions<Book>; bookShelf: BookShelvesEnum },
  ) {
    const { id, bookShelf } = body;
    return this.bookService.updateShelf(id, bookShelf);
  }

  @Delete()
  delete(@Body('id') id: string) {
    return this.bookService.remove(id);
  }
}
