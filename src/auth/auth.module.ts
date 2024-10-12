import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './auth-jwt.strategy';

@Module({
  imports: [PassportModule, ConfigModule],
  providers: [JwtStrategy],
})
export class AuthModule {}