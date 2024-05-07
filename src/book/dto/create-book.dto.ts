import { BookShelvesEnum } from '../../types/book.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  id: string;

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
