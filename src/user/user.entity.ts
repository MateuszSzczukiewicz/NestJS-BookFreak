import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from '../book/book.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Book, (book) => book.user)
  books: Book[];
}
