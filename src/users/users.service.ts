import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create({
      id: uuidv4(),
      ...createUserDto,
    });
    return this.usersRepository.save(newUser);
  }

  findAll(name?: string): Promise<User[]> {
    const options: any = {
      relations: ['pets'],
    };

    if (name) {
      options.where = { name };
      return this.usersRepository.find(options);
    }

    return this.usersRepository.find({
      relations: ['pets'],
    });
  }

  async findOne(id: string): Promise<User> {
    const options: any = {
      relations: ['pets'],
    };
    try {
      options.where = { id };

      const user = await this.usersRepository.findOneOrFail(options);
      return user;
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    user.name = updateUserDto.name;
    user.age = updateUserDto.age;

    const updatedUser = await this.usersRepository.save(user);
    return updatedUser;
  }

  async remove(id: string): Promise<User> {
    const user = await this.findOne(id);

    return await this.usersRepository.remove(user);
  }
}
