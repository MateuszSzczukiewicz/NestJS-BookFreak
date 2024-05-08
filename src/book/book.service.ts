import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository, UpdateResult } from 'typeorm';
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
    const book: Book = await this.bookRepository.findOne(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  async findAll(): Promise<Book[]> {
    const books: Book[] = await this.bookRepository.find();
    if (!books.length) {
      throw new NotFoundException('Books not found');
    }

    return books;
  }

  async update(
    id: FindOneOptions<Book>,
    book: UpdateBookDto,
  ): Promise<UpdateResult> {
    await this.findOne(id);
    return this.bookRepository.update(id, book);
  }

  async updateShelf(
    id: FindOneOptions<Book>,
    book: UpdateBookDto,
  ): Promise<UpdateResult> {
    const bookToUpdate: Book = await this.findOne(id);
    bookToUpdate.bookShelf = book.bookShelf;

    return this.bookRepository.update(id, bookToUpdate);
  }

  async delete(id: FindOneOptions<Book>): Promise<Book> {
    const bookToDelete: Book = await this.findOne(id);
    return this.bookRepository.remove(bookToDelete);
  }
}
