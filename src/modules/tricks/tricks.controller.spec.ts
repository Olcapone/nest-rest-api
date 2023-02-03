import { Test, TestingModule } from '@nestjs/testing';
import { TricksController } from './tricks.controller';
import { TricksService } from './tricks.service';
import { FirebaseService } from '../../firebase/firebase.service';
import { CreateTrickDto } from '../tricks/dto/create-trick.dto';

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
      jest.spyOn(tricksService, 'findAll').mockImplementation(() => {
        return new Promise((resolve): void => {
          resolve(result);
        });
      });

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return trick', async () => {
      const fakeId = '123'
      const result = new CreateTrickDto();
      jest.spyOn(tricksService, 'findOne').mockImplementation((fakeId) => {
        return new Promise((resolve): void => {
          resolve(result);
        });
      });

      expect(await controller.findOne(fakeId)).toBe(result);
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
