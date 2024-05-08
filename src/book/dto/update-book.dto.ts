import { BookShelvesEnum } from '../../types/book.enum';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBookDto {
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
  bookShelf: BookShelvesEnum;
}
