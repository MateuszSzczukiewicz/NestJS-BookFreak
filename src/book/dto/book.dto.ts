import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { BookShelvesEnum } from '../enums/book.enum';

export class BookDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  @IsOptional()
  bookImage: string | ArrayBuffer | null;

  @IsEnum(BookShelvesEnum)
  @IsOptional()
  bookShelf: BookShelvesEnum;
}
