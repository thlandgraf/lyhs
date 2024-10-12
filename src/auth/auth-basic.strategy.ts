import { BasicStrategy as Strategy } from 'passport-http';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({ passReqToCallback: true });
  }

  public validate = async (req, username, password): Promise<boolean> => {
    console.log(`username: ${username}, password: ${password}`);
    if (
      this.configService.get<string>('HTTP_BASIC_USER') === username &&
      this.configService.get<string>('HTTP_BASIC_PASS') === password
    ) return true;
    console.error('Invalid credentials');
    throw new UnauthorizedException();
  };
}
