import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as localtunnel  from 'localtunnel'

async function setupLocalTunnel(port: number) {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // wait for freeing the addess
  const tunnel = await localtunnel({ 
    port,
    subdomain: process.env.LOCALTUNNEL_SUBDOMAIN || 'lyhs3000'
  });

  tunnel.on('close', () => {
    console.log('Localtunnel closed - exiting');
    process.exit();
  });
  return tunnel.url as string;
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const url = await setupLocalTunnel(3000);
  console.log(`Localtunnel running at ${url}`);
  await app.listen(3000);
}
bootstrap();
