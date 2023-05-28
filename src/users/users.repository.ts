/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/CreateUserDto';
import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10;

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(query: string) {
    if (!query) {
      return await this.prisma.user.findMany();
    } else if (query) {
      try {
        return await this.prisma.user.findMany({
          where: {
            OR: [{ name: { contains: query } }, { email: { contains: query } }],
          },
        });
      } catch (error) {
        if (error.code === 'P2025')
          throw new NotFoundException('User not found');
        else throw new Error('Internal Server Error');
      }
    }
  }

  async findOne(id: number) {
    const found = await this.prisma.user.findUnique({
      where: { id: id },
      include: {
        Book: true,
      },
    });
    if (!found) throw new NotFoundException('User not found');
    return found;
  }

  async update(id: number, input: UpdateUserDto) {
    if (input.password) {
      const hashedPassword = await bcrypt.hash(input.password, roundsOfHashing);

      const updateUser = await this.prisma.user.update({
        where: {
          id: +id,
        },
        data: {
          name: input.name,
          email: input.email,
          password: hashedPassword,
        },
      });
      return updateUser;
    }
  }

  async put(id: number, input: UpdateUserDto) {
    const updateUser = await this.prisma.user.update({
      where: {
        id: +id,
      },
      data: {
        name: input.name,
        email: input.email,
      },
    });
    if (!input.name || !input.email) return 'Name / Email must not be empty';
    return updateUser;
  }

  async remove(id: number) {
    try {
      await this.prisma.user.delete({
        where: { id: +id },
      });
      return 'Successfully Deleted';
    } catch (error) {
      if (error.code === 'P2025') throw new NotFoundException('User not found');
      else throw new Error('Internal Server Error');
    }
  }

  async create(input: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(input.password, roundsOfHashing);
    try {
      return await this.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashedPassword,
        },
      });
    } catch (error) {
      if (error.code === 'P2002')
        throw new NotFoundException('User already exist');
    }
  }

  // async create(input) {
  //   return await this.prisma.user.create({
  //     data: {
  //       name: input.name,
  //       email: input.email,
  //       password: input.password,
  //     },
  //   });
  // }
}
