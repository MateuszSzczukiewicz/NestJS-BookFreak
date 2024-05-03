import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(id: string) {
    return this.bookService.findOne(id);
  }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }
}
