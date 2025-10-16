import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class UsersService {
    constructor(@InjectQueue('users-queue') private readonly queue: Queue) {}

    async createUser(email: string, password: string) {
        console.log(`User created: ${email}`);
        await this.queue.add('user-sign-up-job', { email, password });
        console.log(`Enqueued sign-up job for user: ${email}`);
    }

    // async onModuleInit() {
    //     await this.queue.add(
    //         'recurring-task',
    //         { message: 'Run this task every 5 seconds' },
    //         { repeat: { every: 5000 } } // Repeat every 5 seconds
    //     );
    // }
}