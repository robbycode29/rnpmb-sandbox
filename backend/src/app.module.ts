import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { BullModule } from '@nestjs/bullmq';
import { UsersModule } from './users/users.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

import { DataSource } from 'typeorm';

import { User } from './users/users.entity';

const redisHost = process.env.REDIS_HOST;
const redisPort = parseInt(process.env.REDIS_PORT ?? '6379', 10);

import * as dotenv from 'dotenv';
import { SignUpTask } from "./users/users.processor";

dotenv.config();

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: redisHost,
        port: redisPort,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5432,
      password: process.env.POSTGRES_PASSWORD,
      username: process.env.POSTGRES_USER,
      entities: [User],
      database: process.env.POSTGRES_DB,
      synchronize: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL as string),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, SignUpTask],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
