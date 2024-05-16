import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Book } from './book.entity';
import { BookShelvesEnum } from './enums/book.enum';
import { BookDto } from './dto/book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async createOne(book: BookDto, userId: number): Promise<Book> {
    book.userId = userId;
    return this.bookRepository.save(book);
  }

  async findOne(id: number): Promise<Book> {
    const book: Book = await this.bookRepository.findOne({
      where: { id },
    });

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

  async update(id: number, book: BookDto): Promise<UpdateResult> {
    await this.findOne(id);
    return this.bookRepository.update(id, book);
  }

  async updateShelf(
    id: number,
    bookShelf: BookShelvesEnum,
  ): Promise<UpdateResult> {
    const bookToUpdate: Book = await this.findOne(id);
    bookToUpdate.bookShelf = bookShelf;

    return this.bookRepository.update(id, bookToUpdate);
  }

  async delete(id: number): Promise<Book> {
    const bookToDelete: Book = await this.findOne(id);
    return this.bookRepository.remove(bookToDelete);
  }
}
