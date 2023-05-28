/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksRepository } from './books.repository';

@Injectable()
export class BooksService {
  constructor(private readonly BooksRepository: BooksRepository) {}
  create(input: CreateBookDto) {
    return this.BooksRepository.create(input);
  }

  findAll(query: string) {
    return this.BooksRepository.findAll(query);
  }

  findOne(id: number) {
    return this.BooksRepository.findOne(id);
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.BooksRepository.update(id, updateBookDto);
  }

  put(id: number, input: CreateBookDto) {
    return this.BooksRepository.put(id, input);
  }

  remove(id: number) {
    return this.BooksRepository.remove(id);
  }
}
