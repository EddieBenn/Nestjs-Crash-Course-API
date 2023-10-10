import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;

  const mockRepository = {
    create: jest.fn((dto) => dto),
    save: jest.fn((dto) =>
      Promise.resolve({
        id: '',
        ...dto,
      }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user and save to db', async () => {
    const userData = new CreateUserDto();
    const user = await service.create(userData);

    expect(user).toEqual({
      id: expect.any(String),
      ...userData,
    });
    expect(mockRepository.create).toHaveBeenCalledWith({
      id: expect.any(String),
      ...userData,
    });
    expect(mockRepository.save).toHaveBeenCalledWith({
      id: expect.any(String),
      ...userData,
    });
  });
});
