/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { JWTModule } from './auth/JWT.module';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [BooksModule, UsersModule, AuthModule, JWTModule],
  // controllers: [AppController],
  // providers: [
  //   AppService,
  //   {
  //     provide: APP_GUARD,
  //     useClass: RolesGuard,
  //   },
  // ],
})
export class AppModule {}
