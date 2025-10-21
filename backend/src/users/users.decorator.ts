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
  private static tasks: Map<string, new (...args: any[]) => Task> = new Map();

  static registerTask(type: string, task: new (...args: any[]) => Task) {
    this.tasks.set(type, task);
  }

  static getTask(type: string): (new (...args: any[]) => Task) | undefined {
    return this.tasks.get(type);
  }
}

export function RegisterTask(type: string) {
  return function (constructor: new (...args: any[]) => Task) {
    TaskRegistry.registerTask(type, constructor);
  };
}
