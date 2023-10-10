import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    create: jest.fn((dto) => dto),
    update: jest.fn((id, dto) => ({
      id,
      ...dto,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const userDate = new CreateUserDto();
    const user = await controller.create(userDate);

    expect(user).toEqual(userDate);
    expect(mockUsersService.create).toHaveBeenCalledWith(userDate);
  });

  it('should update a user', async () => {
    const id = '1';
    const userDate = new UpdateUserDto();
    const expectedResult = {
      id,
      ...userDate,
    };
    const updatedUser = await controller.update(id, userDate);

    expect(updatedUser).toEqual(expectedResult);
    expect(mockUsersService.update).toHaveBeenCalledWith(id, userDate);
  });
});
