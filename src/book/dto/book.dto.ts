import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BookShelvesEnum } from '../enums/book.enum';

export class BookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  @IsOptional()
  bookImage?: string | ArrayBuffer;

  @IsNotEmpty()
  @IsEnum(BookShelvesEnum)
  bookShelf: BookShelvesEnum;
}
