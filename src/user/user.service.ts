import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Book } from '../book/book.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async assignBookToUser(userId: number, bookId: number): Promise<User> {
    const user = await this.userRepository.findOne(userId, {
      relations: ['books'],
    });
    const book = await this.bookRepository.findOne(bookId);

    if (!user || !book) {
      throw new Error('User or book not found');
    }

    user.books = [...user.books, book];
    return this.userRepository.save(user);
  }

  async getBooksOfUser(userId: number): Promise<Book[]> {
    const user = await this.userRepository.findOne(userId, {
      relations: ['books'],
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user.books;
  }
}
