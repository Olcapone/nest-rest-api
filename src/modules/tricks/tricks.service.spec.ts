import { Test, TestingModule } from '@nestjs/testing';
import { TricksService } from './tricks.service';

describe('UsersService', () => {
  let service: TricksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TricksService],
    }).compile();

    service = module.get<TricksService>(TricksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
