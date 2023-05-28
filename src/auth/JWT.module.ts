/* eslint-disable prettier/prettier */
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    {
      ...JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secretOrKeyProvider: () => configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: 3600,
          },
        }),
        inject: [ConfigService],
      }),
      global: true,
    },
  ],
  exports: [JwtModule],
})
export class JWTModule {}
