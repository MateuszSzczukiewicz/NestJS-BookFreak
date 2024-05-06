import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BookShelvesEnum } from '../types/book.enum';
import { User } from '../user/user.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  bookImage: string | ArrayBuffer;

  @Column()
  bookShelf: BookShelvesEnum;

  @ManyToOne(() => User, (user) => user.books)
  user: User;
}
