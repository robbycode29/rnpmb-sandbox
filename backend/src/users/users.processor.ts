import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { TaskRegistry, RegisterTask, Task } from './users.decorator';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { DataSource } from 'typeorm';
import { withTransaction } from '../utils/transaction.helper';

@Processor('users-queue')
export class UsersProcessor extends WorkerHost {
  async process(job: Job<any>) {
    console.log(`Processing user job ${job.id} with data:`, job.data);
    const TaskConstructor = TaskRegistry.getTask(job.name);
    if (!TaskConstructor) {
      throw new Error(`No task registered for job type: ${job.name}`);
    }
    const task = new TaskConstructor();
    await task.execute(job.data);
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(`User job ${job.id} completed`);
  }
}

@RegisterTask('user-sign-up-job')
@Injectable()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class SignUpTask implements Task {
  constructor(
    @InjectRepository(User)
    private dataSource: DataSource,
  ) {}

  async execute(data: { email: string; password: string }) {
    console.log('Executing sign-up task with data:', data);

    await withTransaction(this.dataSource, async (queryRunner) => {
      const user = new User();
      user.email = data.email;
      user.password = data.password;
      await queryRunner.manager.save(user);
    });
  }
}

@RegisterTask('recurring-task')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class RecurringTask implements Task {
  execute(data: any) {
    console.log('Executing recurring task...');
    // Add recurring task logic here
  }
}
