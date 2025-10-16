import { NestFactory } from '@nestjs/core';
import { AppModule } from "./app.module";

async function bootstrap() {
    await NestFactory.createApplicationContext(AppModule);
    console.log('Worker service started and listening for jobs...');

    // Keep the process alive indefinitely
    // The BullMQ processors will run in the background
    setInterval(() => {}, 1000); // Prevent the process from exiting
}
bootstrap();
