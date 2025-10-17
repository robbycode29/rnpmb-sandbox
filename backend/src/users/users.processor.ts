import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { TaskRegistry, RegisterTask, Task } from './users.decorator';


@Processor('users-queue')
export class UsersProcessor extends WorkerHost {
    async process(job: Job<any>) {
        console.log(`Processing user job ${job.id} with data:`, job.data);
        const task = TaskRegistry.getTask(job.name);
        if (!task) {
            throw new Error(`No task registered for job type: ${job.name}`);
        }
        task.execute(job.data);
    }

    @OnWorkerEvent('completed')
    onCompleted(job: Job) {
        console.log(`User job ${job.id} completed`);
    }
}


@RegisterTask('user-sign-up-job')
class SignUpTask implements Task {
    execute(data: any) {
        console.log('Executing sign-up task with data:', data);
        // Add sign-up task logic here
    }
}


@RegisterTask('recurring-task')
class RecurringTask implements Task {
    execute(data: any) {
        console.log('Executing recurring task...');
        // Add recurring task logic here
    }
}
