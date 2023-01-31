import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  AuthError
} from 'firebase/auth';
import {
  setDoc,
  DocumentReference,
  doc,
  getDoc,
  DocumentSnapshot,
  DocumentData
} from 'firebase/firestore';
import { FirebaseService } from '../../firebase/firebase.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private fireBaseService: FirebaseService) {}
  private _errorHandler(code) {
    switch(code) {
      case 'auth/wrong-password':
        throw new HttpException(
            'Email or password incorrect.',
            HttpStatus.FORBIDDEN
        );

      case 'auth/user-not-found':
        throw new HttpException('Email not found.', HttpStatus.NOT_FOUND);

      case 'auth/email-already-in-use':
        throw new HttpException('Email is already used', HttpStatus.CONFLICT);

      default:
        throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }
  public async login(body): Promise<Omit<AuthDto, 'password'>> {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        this.fireBaseService.auth,
        body.email,
        body.password
      );

      if (userCredential) {
        const id: string = userCredential.user.uid;
        const docRef: DocumentReference = doc(
          this.fireBaseService.usersCollection,
          id
        );
        const snapshot: DocumentSnapshot<DocumentData> = await getDoc(docRef);
        const loggedUser: AuthDto = {
          ...snapshot.data(),
          id: snapshot.id
        } as AuthDto;

        delete loggedUser.password;

        return loggedUser;
      }
    } catch (error) {
      const firebaseAuthError = error as AuthError;
      this._errorHandler(firebaseAuthError.code);
    }
  }

  public async signup(body): Promise<void> {
    try {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(
          this.fireBaseService.auth,
          body.email,
          body.password
        );

      if (userCredential) {
        const id: string = userCredential.user.uid;
        const docRef: DocumentReference = doc(
          this.fireBaseService.usersCollection,
          id
        );
        await setDoc(docRef, { email: body.email });
      }
    } catch (error) {
      const firebaseAuthError = error as AuthError;
      this._errorHandler(firebaseAuthError.code);
    }
  }
}
