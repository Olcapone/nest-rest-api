import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FirebaseService } from '../../firebase/firebase.service'

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let fireBase: FirebaseService;

  beforeEach(() => {
    authService = new AuthService(fireBase);
    controller = new AuthController(authService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
