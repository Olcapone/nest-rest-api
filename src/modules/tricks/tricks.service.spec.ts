import { Test, TestingModule } from '@nestjs/testing';
import { TricksService } from './tricks.service';
import { FirebaseService } from '../../firebase/firebase.service'

describe('TracksService', () => {
  let service: TricksService;
  let fireBase: FirebaseService;

  beforeEach(async () => {
    service = new TricksService(fireBase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
