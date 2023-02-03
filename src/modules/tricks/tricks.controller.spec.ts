import { Test, TestingModule } from '@nestjs/testing';
import { TricksController } from './tricks.controller';
import { TricksService } from './tricks.service';
import { FirebaseService } from '../../firebase/firebase.service'

describe('TricksController', () => {
  let controller: TricksController;
  let tricksService: TricksService;
  let fireBase: FirebaseService;

  beforeEach(() => {
    tricksService = new TricksService(fireBase);
    controller = new TricksController(tricksService);
  });

  describe('findAll', () => {
    it('should return an array of tricks', async () => {
      const result = ['test'];
      jest.spyOn(tricksService, 'findAll')
          .mockImplementation(() => {
            return new Promise((resolve): void => {
              resolve(result);
            });
          });

      expect(await controller.findAll()).toBe(result);
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
