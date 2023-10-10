import { Test, TestingModule } from '@nestjs/testing';
import { PetsService } from './pets.service';
import { createMock, DeepMocked } from '@golevelup/ts-jest';

describe('PetsService', () => {
  let service: DeepMocked<PetsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PetsService,
          useValue: createMock<PetsService>(),
        },
      ],
    }).compile();

    service = module.get(PetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
