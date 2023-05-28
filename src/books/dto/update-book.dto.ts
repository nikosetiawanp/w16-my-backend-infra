/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  author: string;

  @IsString()
  @ApiProperty()
  image: string;

  @IsNumber()
  @ApiProperty()
  rating: number;
}
