import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BookShelvesEnum } from '../types/book.enum';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  bookImage: string;

  @Column()
  bookShelf: BookShelvesEnum;
}
