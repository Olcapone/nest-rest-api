import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { FirebaseService } from '../../firebase/firebase.service'

describe('AuthService', () => {
  let service: AuthService;
  let fireBase: FirebaseService;

  beforeEach(async () => {
    service = new AuthService(fireBase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
