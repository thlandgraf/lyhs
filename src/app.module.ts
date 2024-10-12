import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { WorkPackagesController } from './work-packages.controller';
import { OpenApiController } from './openapi.controller';
import { WorkPackagesService } from './work-packages.service';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule],
  controllers: [
    AppController,
    WorkPackagesController,
    OpenApiController
  ],
  providers: [
    AppService,
    WorkPackagesService
  ],
})
export class AppModule {}
