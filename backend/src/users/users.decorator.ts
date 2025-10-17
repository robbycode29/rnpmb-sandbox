import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user; // Assumes `user` is attached to the request object
    },
);

// Task decorator pattern
export interface Task {
    execute(data: any): void;
}

export class TaskRegistry {
    private static tasks: Map<string, Task> = new Map();

    static registerTask(type: string, task: Task) {
        this.tasks.set(type, task);
    }

    static getTask(type: string): Task | undefined {
        return this.tasks.get(type);
    }
}

export function RegisterTask(type: string) {
    return function (constructor: new () => Task) {
        const taskInstance = new constructor();
        TaskRegistry.registerTask(type, taskInstance);
    };
}
