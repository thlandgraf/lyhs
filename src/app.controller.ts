import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('protected')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @UseGuards(AuthGuard('basic'))
  @Get()
  hello(): string {
    return "world"
  }
}
