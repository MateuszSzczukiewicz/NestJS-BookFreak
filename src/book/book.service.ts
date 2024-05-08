import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async createOne(book: CreateBookDto): Promise<Book> {
    return this.bookRepository.save(book);
  }

  async findOne(id: FindOneOptions<Book>): Promise<Book> {
    const book = await this.bookRepository.findOne(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  async findAll(): Promise<Book[]> {
    const books = await this.bookRepository.find();
    if (!books.length) {
      throw new NotFoundException('Books not found');
    }

    return books;
  }

  async update(id: FindOneOptions<Book>, book: UpdateBookDto): Promise<Book> {
    const bookToUpdate = await this.findOne(id);
    if (!bookToUpdate) {
      throw new NotFoundException('Book not found');
    }
    Object.assign(bookToUpdate, book);

    return this.bookRepository.save(bookToUpdate);
  }

  async updateShelf(
    id: FindOneOptions<Book>,
    book: UpdateBookDto,
  ): Promise<Book> {
    const bookToUpdate = await this.findOne(id);
    if (!bookToUpdate) {
      throw new NotFoundException('Book not found');
    }
    bookToUpdate.bookShelf = book.bookShelf;

    return this.bookRepository.save(bookToUpdate);
  }

  async delete(id: FindOneOptions<Book>): Promise<void> {
    const bookToDelete = await this.findOne(id);
    if (!bookToDelete) {
      throw new NotFoundException('Book not found');
    }

    await this.bookRepository.remove(bookToDelete);
  }
}
