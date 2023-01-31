import { Test, TestingModule } from '@nestjs/testing';
import { TricksController } from './tricks.controller';
import { TricksService } from './tricks.service';

describe('UsersController', () => {
  let controller: TricksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TricksController],
      providers: [TricksService],
    }).compile();

    controller = module.get<TricksController>(TricksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
