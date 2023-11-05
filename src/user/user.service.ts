import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User | undefined> {
    return await this.userRepository.save({
      ...createUserDto,
      createdDate: createUserDto.createdDate
        ? new Date(createUserDto.createdDate)
        : new Date(),
    });
  }

  async findAll() {
    console.log(process.env.NODE_ENV);
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { id } });
    return await this.userRepository.save({
      ...user,
      ...updateUserDto,
      createdDate: updateUserDto.createdDate
        ? new Date(updateUserDto.createdDate)
        : new Date(),
    });
  }

  async remove(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { id } });
    return this.userRepository.remove(user);
  }
}
