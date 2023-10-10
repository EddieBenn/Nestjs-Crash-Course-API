import { Test, TestingModule } from '@nestjs/testing';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { createMock, DeepMocked } from '@golevelup/ts-jest';

describe('PetsController', () => {
  let controller: PetsController;
  let service: DeepMocked<PetsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetsController],
      providers: [
        {
          provide: PetsService,
          useValue: createMock<PetsService>(),
        },
      ],
    }).compile();

    controller = module.get<PetsController>(PetsController);
    service = module.get(PetsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
