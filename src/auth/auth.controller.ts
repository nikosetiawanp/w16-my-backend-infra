// import { Body, Controller, HttpCode, Post } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
// import { AuthEntity } from './entity';
// import { LoginDto } from './dto/login.dto';

// @Controller('auth')
// @ApiTags('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post('login')
//   @ApiOkResponse({ type: AuthEntity })
//   login(@Body() { email, password }: LoginDto) {
//     console.log('auth.controller works');
//     return this.authService.login(email, password);
//   }
// }

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @HttpCode(HttpStatus.OK)
  // @Post('login')
  // login(@Body() LoginDto: Record<string, any>) {
  //   return this.authService.login(LoginDto.email, LoginDto.password);
  // }
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.login(email, password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
