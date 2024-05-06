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

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() createBookDto: CreateBookDto) {
    return this.bookService.update(id, createBookDto);
  }

  @Patch(':id')
  updateShelf(@Param('id') id: string, @Body() createBookDto: CreateBookDto) {
    return this.bookService.updateShelf(id, createBookDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
