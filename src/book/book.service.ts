import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Book } from './book.entity';
import { BookDto } from './dto/book.dto';
import { BookShelvesEnum } from './enums/book.enum';
import { User } from '../auth/user/user.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(userId: number): Promise<Book[]> {
    return this.bookRepository.find({ where: { user: { id: userId } } });
  }

  async findOne(userId: number, id: number): Promise<Book> {
    const book: Book = await this.bookRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!book) {
      throw new NotFoundException(`Book ${id} not found for user ${userId}`);
    }
    return book;
  }

  async createOne(bookDto: BookDto, userId: number): Promise<Book> {
    const user: User = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(`User ${userId} not found`);
    }

    const book: Book = this.bookRepository.create({
      ...bookDto,
      user,
    });
    return this.bookRepository.save(book);
  }

  async updateOne(
    userId: number,
    bookId: number,
    bookDto: BookDto,
  ): Promise<UpdateResult> {
    const book: Book = await this.bookRepository.findOne({
      where: { id: bookId, user: { id: userId } },
    });
    if (!book) {
      throw new NotFoundException(
        `Book ${bookId} not found for user ${userId}`,
      );
    }

    return this.bookRepository.update(
      { id: bookId, user: { id: userId } },
      bookDto,
    );
  }

  async updateShelf(
    userId: number,
    bookId: number,
    bookShelf: BookShelvesEnum,
  ): Promise<UpdateResult> {
    const book: Book = await this.bookRepository.findOne({
      where: { id: bookId, user: { id: userId } },
    });
    if (!book) {
      throw new NotFoundException(
        `Book ${bookId} not found for user ${userId}`,
      );
    }

    return this.bookRepository.update(
      { id: bookId, user: { id: userId } },
      { bookShelf },
    );
  }

  async deleteOne(userId: number, bookId: number): Promise<void> {
    const book: Book = await this.bookRepository.findOne({
      where: { id: bookId, user: { id: userId } },
    });
    if (!book) {
      throw new NotFoundException(
        `Book ${bookId} not found for user ${userId}`,
      );
    }

    await this.bookRepository.remove(book);
  }
}
