import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BookShelvesEnum } from '../enums/book.enum';

export class BookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsOptional()
  @IsString()
  bookImage?: string | ArrayBuffer;

  @IsOptional()
  @IsEnum(BookShelvesEnum)
  bookShelf: BookShelvesEnum;
}
