import { User } from '../../../user/user.entity';
import { Faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';

define(User, (faker: Faker) => {
  const user: User = new User();
  const firstName: string = faker.person.firstName();
  const lastName: string = faker.person.lastName();
  user.username = `${firstName} ${lastName}`;
  return user;
});
