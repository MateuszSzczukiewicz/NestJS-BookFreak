import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { BookShelvesEnum } from '../types/book.enum';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    return this.bookRepository.save(createBookDto);
  }

  async findOne(id: FindOneOptions<Book>) {
    return this.bookRepository.findOne(id);
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async update(
    id: string,
    updateBookDto: UpdateBookDto,
  ): Promise<UpdateResult> {
    return this.bookRepository.update(id, updateBookDto);
  }

  async updateShelf(
    id: FindOneOptions<Book>,
    bookShelf: BookShelvesEnum,
  ): Promise<Book> {
    const bookToUpdate = await this.bookRepository.findOne(id);

    bookToUpdate.bookShelf = bookShelf;

    return this.bookRepository.save(bookToUpdate);
  }

  async remove(id: string): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
