import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 0, name: 'Benn' },
    { id: 1, name: 'Eddie' },
    { id: 2, name: 'Macc' },
  ];

  create(createUserDto: CreateUserDto): User {
    const newUser = { id: Date.now(), ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new Error('user not found');
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto): User {
    const userToBeUpdated = this.users.find((user) => user.id === id);

    if (!userToBeUpdated) {
      throw new Error('user not found');
    }
    const updatedUser = { id, ...updateUserDto };
    this.users[id] = updatedUser;

    return updatedUser;
  }

  remove(id: number) {
    const userToBeRemoved = this.users.find((user) => user.id === id);

    if (!userToBeRemoved) {
      throw new Error('user not found');
    }

    this.users.filter((user) => user.id !== id);

    return `User with the id:${id} removed`;
  }
}
