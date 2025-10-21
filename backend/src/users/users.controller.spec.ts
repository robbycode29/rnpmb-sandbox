import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: Partial<UsersService>;

  beforeEach(async () => {
    usersService = {
      createUser: jest.fn(),
      listUsers: jest.fn().mockResolvedValue([{ email: 'test@example.com' }]),
      createUserDirectly: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: usersService }],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
  });

  it('should call UsersService.createUser on signup', async () => {
    const dto: CreateUserDto = {
      email: 'test@example.com',
      password: '123456',
    };
    await usersController.signup(dto, null);
    expect(usersService.createUser).toHaveBeenCalledWith(
      dto.email,
      dto.password,
    );
  });

  it('should return a list of users', async () => {
    const result = await usersController.listUsers();
    expect(result).toEqual([{ email: 'test@example.com' }]);
    expect(usersService.listUsers).toHaveBeenCalled();
  });

  it('should call UsersService.createUserDirectly on createUser', async () => {
    const dto: CreateUserDto = {
      email: 'test@example.com',
      password: '123456',
    };
    await usersController.createUser(dto);
    expect(usersService.createUserDirectly).toHaveBeenCalledWith(
      dto.email,
      dto.password,
    );
  });
});
