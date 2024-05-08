import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { BookShelvesEnum } from './enums/book.enum';

@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  author: string;

  @Column({ type: 'varchar', nullable: true })
  bookImage: string | ArrayBuffer;

  @Column({ type: 'enum', enum: BookShelvesEnum })
  bookShelf: BookShelvesEnum;

  @ManyToOne(() => User, (user) => user.books)
  user: User;
}
