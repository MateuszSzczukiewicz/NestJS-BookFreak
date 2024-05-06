import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    return this.bookRepository.save(createBookDto);
  }

  async findOne(id: number): Promise<Book> {
    return this.bookRepository.findOne(id);
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async update(bookId: string, createBookDto: CreateBookDto): Promise<Book> {
    const bookToUpdate = await this.bookRepository.findOne(bookId);
    if (!bookToUpdate) {
      return null;
    }

    bookToUpdate.title = createBookDto.title;
    bookToUpdate.author = createBookDto.author;
    bookToUpdate.bookImage = createBookDto.bookImage;
    bookToUpdate.bookShelf = createBookDto.bookShelf;

    return this.bookRepository.save(bookToUpdate);
  }

  async remove(id: number): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
