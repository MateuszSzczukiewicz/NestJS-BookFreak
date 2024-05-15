import { Factory, Seeder } from 'typeorm-seeding';
import { DataSource } from 'typeorm';
import { User } from '../../../user/user.entity';
import { initializeSeeds } from '../initializeSeeds';

initializeSeeds();

export default class userSeeder implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(User)().createMany(15);
  }
}
