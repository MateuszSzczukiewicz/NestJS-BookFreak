import { BookShelvesEnum } from '../enums/book.enum';

export interface IBook {
  id: string;
  title: string;
  author: string;
  bookImage: string | ArrayBuffer | null;
  bookShelf: BookShelvesEnum;
}
