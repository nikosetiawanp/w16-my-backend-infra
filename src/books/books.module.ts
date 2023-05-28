/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { BooksRepository } from './books.repository';
import { PrismaService } from 'src/prisma.service';
import { UsersRepository } from 'src/users/users.repository';

@Module({
  controllers: [BooksController],
  providers: [BooksService, BooksRepository, PrismaService, UsersRepository],
})
export class BooksModule {}
