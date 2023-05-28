/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { URLSearchParams } from 'url';
import { UpdateBookDto } from './dto/update-book.dto';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(query: string) {
    if (!query) {
      return await this.prisma.book.findMany();
    } else if (query) {
      try {
        return await this.prisma.book.findMany({
          where: {
            OR: [
              { title: { contains: query } },
              { author: { contains: query } },
            ],
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
    const found = await this.prisma.book.findUnique({
      where: { id: +id },
      include: {
        User: true,
      },
    });
    if (!found) throw new NotFoundException('Book not found');
    return found;

    try {
      await this.prisma.book.findUnique({
        where: { id: +id },
        include: {
          User: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') throw new NotFoundException('Book not found');
      else throw new Error('Internal Server Error');
    }
  }

  async update(id: number, input: UpdateBookDto) {
    const updateBook = await this.prisma.book.update({
      where: {
        id: +id,
      },
      data: {
        title: input.title,
        author: input.author,
        image: input.image,
        rating: input.rating,
      },
    });

    return updateBook;
  }

  async put(id: number, input: CreateBookDto) {
    // const updateBook = await this.prisma.book.update({
    //   where: {
    //     id: +id,
    //   },
    //   data: {
    //     title: input.title,
    //     author: input.author,
    //     image: input.image,
    //     rating: input.rating,
    //   },
    // });
    // if (!input.title || !input.author || !input.image || !input.rating)
    //   return 'Title / Author / Image /Rating must not be empty';

    // return updateBook;

    return await this.prisma.book.update({
      where: {
        id: +id,
      },
      data: {
        title: input.title,
        author: input.author,
        image: input.image,
        rating: input.rating,
      },
    });
  }

  async remove(id: number) {
    try {
      await this.prisma.book.delete({
        where: { id: +id },
      });
      return 'Successfully Deleted';
    } catch (error) {
      if (error.code === 'P2025') throw new NotFoundException('Book not found');
      else throw new Error('Internal Server Error');
    }
  }

  async create(input: CreateBookDto) {
    return await this.prisma.book.create({
      data: {
        title: input.title,
        author: input.author,
        image: input.image,
        rating: input.rating,
      },
    });
  }
}
