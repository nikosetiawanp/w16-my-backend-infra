/* eslint-disable prettier/prettier */
// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (!requiredRoles) {
//       return true;
//     }
//     const { user } = context.switchToHttp().getRequest();
//     return requiredRoles.some((role) => user.roles?.includes(role));
//   }
// }

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/users.repository';
import { BooksRepository } from 'src/books/books.repository';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let isOwner;
    if (request.route.path === '/users/:id') {
      isOwner = request.user.id === Number(request.params.id);
    } else {
      const userDetails = await this.usersRepository.findOne(request.user.id);
      const found = userDetails.Book.find(
        (Book) => Book.id === Number(request.params.id),
      );
      isOwner = !!found;
    }
    if (request.user.role === 'admin' || isOwner) {
      return true;
    } else {
      throw new ForbiddenException('You are not authorized');
    }
  }
}
