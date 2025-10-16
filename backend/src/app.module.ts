import { Module } from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';

import {BullModule} from '@nestjs/bullmq';
import { UsersModule } from "./users/users.module";

const redisHost = process.env.REDIS_HOST ?? 'localhost';
const redisPort = parseInt(process.env.REDIS_PORT ?? '6379', 10);

@Module({
    imports: [
        BullModule.forRoot({
            connection: {
                host: redisHost,
                port: redisPort,
            },
        }),
        UsersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
