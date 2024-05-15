import { Faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import { Book } from '../../../book/book.entity';

define(Book, (faker: Faker) => {
  const book: Book = new Book();
  book.title = faker.music.songName();
  book.author = faker.person.lastName();
  book.bookImage = faker.image.url();
  return book;
});
