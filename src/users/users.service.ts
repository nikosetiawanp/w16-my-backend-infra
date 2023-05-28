/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly UsersRepository: UsersRepository) {}
  create(input: CreateUserDto) {
    return this.UsersRepository.create(input);
  }

  findAll(query: string) {
    return this.UsersRepository.findAll(query);
  }

  findOne(id: number) {
    return this.UsersRepository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.UsersRepository.update(id, updateUserDto);
  }

  put(id: number, updateUserDto: UpdateUserDto) {
    return this.UsersRepository.put(id, updateUserDto);
  }

  remove(id: number) {
    return this.UsersRepository.remove(id);
  }
}
