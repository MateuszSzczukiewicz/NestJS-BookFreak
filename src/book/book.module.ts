import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from './book.service';
import { Book } from './book.entity';
import { BookController } from './book.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), DatabaseModule],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
