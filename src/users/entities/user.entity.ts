/* eslint-disable prettier/prettier */
import { User } from '@prisma/client';
import { Role } from 'src/enums/role.enum';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: Role;

  @Exclude()
  password: string;
}
