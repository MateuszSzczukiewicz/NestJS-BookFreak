import { BookShelvesEnum } from '../../types/book.enum';

export class CreateBookDto {
  id: string;
  title: string;
  author: string;
  bookImage: string | ArrayBuffer | null;
  bookShelf: BookShelvesEnum;
}
