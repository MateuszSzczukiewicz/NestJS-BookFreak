import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from './book.service';
import { Book } from './book.entity';
import { BookController } from './book.controller';
import { User } from '../auth/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, User])],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
