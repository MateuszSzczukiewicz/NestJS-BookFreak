import { Factory, Seeder } from 'typeorm-seeding';
import { DataSource } from 'typeorm';
import { Book } from '../../../book/book.entity';
import { User } from '../../../user/user.entity';
import { initializeSeeds } from '../initializeSeeds';

initializeSeeds();

export default class userSeeder implements Seeder {
  public async run(factory: Factory, connection: DataSource): Promise<void> {
    const users: User[] = await connection.getRepository(User).find();
    await factory(Book)()
      .map(async (book: Book): Promise<Book> => {
        book.user = users[Math.floor(Math.random() * users.length)];
        return book;
      })
      .createMany(15);
  }
}
