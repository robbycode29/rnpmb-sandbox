import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersProcessor } from './users.processor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    BullModule.registerQueue({
      name: 'users-queue',
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    ...(process.env.SERVICE_TYPE === 'worker' ? [UsersProcessor] : []),
  ],
  exports: [UsersService],
})
export class UsersModule {}
