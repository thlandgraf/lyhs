import { Controller, Get, HttpStatus, Logger, Res } from "@nestjs/common";
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller()
export class OpenApiController {
  private readonly logger = new Logger(OpenApiController.name);

  @Get('openapi.yaml')
  getOpenApiSpecification(@Res() res: Response) {
    this.logger.log('Retrieving OpenAPI specification');
    const filePath = path.join('assets', 'openapi.yaml');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        this.logger.error('Error reading OpenAPI specification file', err.message);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Error retrieving OpenAPI specification');
      } else {
        res.setHeader('Content-Type', 'text/yaml');
        res.status(HttpStatus.OK).send(data);
      }
    });
  }
}