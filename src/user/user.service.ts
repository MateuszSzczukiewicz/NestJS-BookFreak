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

  async findOne(): Promise<User> {
    const user: User = await this.userRepository.findOne({
      relations: ['books'],
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
