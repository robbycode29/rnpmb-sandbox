import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersProcessor } from './users.processor';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'users-queue',
        }),
    ],
    controllers: [UsersController],
    providers: [
        UsersService,
        ...(process.env.SERVICE_TYPE === 'worker' ? [UsersProcessor] : []),
    ],
})
export class UsersModule {}