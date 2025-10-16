import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';


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


// Task Registry to store and retrieve tasks
class TaskRegistry {
    private static tasks: Map<string, Task> = new Map();

    static registerTask(type: string, task: Task) {
        this.tasks.set(type, task);
    }

    static getTask(type: string): Task | undefined {
        return this.tasks.get(type);
    }
}


// Base Task interface
interface Task {
    execute(data: any): void;
}


// Task decorator
function RegisterTask(type: string) {
    return function (constructor: new () => Task) {
        const taskInstance = new constructor();
        TaskRegistry.registerTask(type, taskInstance);
    };
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
