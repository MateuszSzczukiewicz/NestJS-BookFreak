import { Injectable } from '@nestjs/common';
import { IBook } from './interfaces/book.interface';

@Injectable()
export class BookService {
  create(book: IBook) {
    return 'This action adds a new book';
  }

  findOne(id: string): string {
    return `This action returns a #${id} book`;
  }

  findAll(): string {
    return 'This action returns all books';
  }
}
