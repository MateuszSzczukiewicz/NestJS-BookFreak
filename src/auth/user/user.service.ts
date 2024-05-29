import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users: User[] = await this.userRepository.find();
    if (!users.length) {
      throw new NotFoundException('Books not found');
    }

    return users;
  }

  async findOne(id: number): Promise<User> {
    const user: User = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async createOne(
    user: Pick<CreateUserDto, 'email' | 'password'>,
  ): Promise<User> {
    return this.userRepository.save({
      email: user.email.trim().toLowerCase(),
      password: this.hashPassword(user.password),
    });
  }

  hashPassword(password: string): string {
    return bcrypt.hashSync(password, 8);
  }
}
