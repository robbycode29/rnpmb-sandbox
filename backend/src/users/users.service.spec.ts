import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Queue } from 'bullmq';
import { DataSource } from 'typeorm';

describe('UsersService', () => {
  let usersService: UsersService;
  let mockQueue: Partial<Queue>;
  let mockDataSource: Partial<DataSource>;

  beforeEach(async () => {
    mockQueue = {
      add: jest.fn(),
    };

    mockDataSource = {
      createQueryRunner: jest.fn().mockReturnValue({
        connect: jest.fn(),
        startTransaction: jest.fn(),
        manager: {
          save: jest.fn(),
          find: jest.fn().mockResolvedValue([{ email: 'test@example.com' }]),
        },
        commitTransaction: jest.fn(),
        rollbackTransaction: jest.fn(),
        release: jest.fn(),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: 'BullQueue_users-queue', useValue: mockQueue }, // Mock users-queue
        { provide: DataSource, useValue: mockDataSource },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should enqueue a sign-up job', async () => {
    await usersService.createUser('test@example.com', '123456');
    expect(mockQueue.add).toHaveBeenCalledWith('user-sign-up-job', {
      email: 'test@example.com',
      password: '123456',
    });
  });

  it('should list users', async () => {
    const result = await usersService.listUsers();
    expect(result).toEqual([{ email: 'test@example.com' }]);
  });

  it('should directly create a user', async () => {
    await usersService.createUserDirectly('test@example.com', '123456');
    const queryRunner = mockDataSource.createQueryRunner!();
    expect(queryRunner.manager.save).toHaveBeenCalled();
    expect(queryRunner.commitTransaction).toHaveBeenCalled();
  });
});
