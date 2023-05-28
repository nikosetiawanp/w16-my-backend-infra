import { Book } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class BookEntity implements Book {
  @ApiProperty()
  title: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;
}
