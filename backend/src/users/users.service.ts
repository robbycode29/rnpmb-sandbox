import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

import { User } from './users.entity';
import { DataSource } from 'typeorm';
import { withTransaction } from '../utils/transaction.helper';

@Injectable()
export class UsersService {
  constructor(
    @InjectQueue('users-queue') private readonly queue: Queue,
    private dataSource: DataSource,
  ) {}

  async createUser(email: string, password: string) {
    console.log(`User created: ${email}`);
    await this.queue.add('user-sign-up-job', { email, password });
    console.log(`Enqueued sign-up job for user: ${email}`);
  }

  async listUsers() {
    await withTransaction(this.dataSource, async (queryRunner) => {
      const users = await queryRunner.manager.find(User);
      console.log('List of users:', users);
      return users;
    });
    return [];
  }

  async createUserDirectly(email: string, password: string) {
    await withTransaction(this.dataSource, async (queryRunner) => {
      const user = new User();
      user.email = email;
      user.password = password;
      await queryRunner.manager.save(user);
      console.log(`Directly created user: ${email}`);
    });
  }

  // async onModuleInit() {
  //     await this.queue.add(
  //         'recurring-task',
  //         { message: 'Run this task every 5 seconds' },
  //         { repeat: { every: 5000 } } // Repeat every 5 seconds
  //     );
  // }
}
