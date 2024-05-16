import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

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

  async createOne(user: CreateUserDto): Promise<User> {
    return this.userRepository.save(user);
  }
}
