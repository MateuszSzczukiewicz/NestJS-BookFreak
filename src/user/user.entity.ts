import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from '../book/book.entity';
import { Length } from 'class-validator';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  @Length(4, 100)
  username: string;

  @Column({ type: 'varchar', length: 100 })
  @Length(4, 100)
  password: string;

  @OneToMany(() => Book, (book) => book.user)
  books: Book[];
}
