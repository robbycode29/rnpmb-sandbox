import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { TaskRegistry, RegisterTask, Task } from './users.decorator';

import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { User } from './users.entity';
import { DataSource } from 'typeorm';
import { withTransaction } from '../utils/transaction.helper';

import { ModuleRef } from '@nestjs/core';

@Processor('users-queue')
export class UsersProcessor extends WorkerHost {
  constructor(private readonly moduleRef: ModuleRef) {
    super();
  }

  async process(job: Job<any>) {
    console.log(`Processing user job ${job.id} with data:`, job.data);
    const TaskConstructor = TaskRegistry.getTask(job.name);
    if (!TaskConstructor) {
      throw new Error(`No task registered for job type: ${job.name}`);
    }
    const task = this.moduleRef.get(TaskConstructor, { strict: false });
    if (!task) {
      throw new Error(
        `Task instance could not be resolved for job type: ${job.name}`,
      );
    }
    task.execute(job.data);
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(`User job ${job.id} completed`);
  }
}

@RegisterTask('user-sign-up-job')
@Injectable()
export class SignUpTask implements Task {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async execute(data: { email: string; password: string }) {
    console.log('Executing sign-up task with data:', data);

    await withTransaction(this.dataSource, async (queryRunner) => {
      console.log('Creating user in the database...');
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
