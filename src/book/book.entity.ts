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

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  author: string;

  @Column({ type: 'varchar', nullable: true })
  bookImage?: string | ArrayBuffer;

  @Column({
    type: 'enum',
    enum: BookShelvesEnum,
    default: BookShelvesEnum.READING,
  })
  bookShelf: BookShelvesEnum;

  @ManyToOne(() => User, (user: User) => user.books, { onDelete: 'CASCADE' })
  user: User;
}
