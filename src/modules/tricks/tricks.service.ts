import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTrickDto } from './dto/create-trick.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  addDoc,
  getDocs,
  setDoc,
  DocumentReference,
  doc,
  collection
} from 'firebase/firestore';
import { FirebaseService } from '../../firebase/firebase.service';

@Injectable()
export class TricksService {
  constructor(private fireBaseService: FirebaseService) {}
  private _errorHandler(code) {
    switch(code) {
      case 'tricks/trick-is-exist':
        throw new HttpException(
            'This trick is exist',
            HttpStatus.BAD_REQUEST
        );
    }
  }
  public async create(createTrickDto: CreateTrickDto) {
    try {
      await addDoc(collection(this.fireBaseService.fireStore, 'tricks'),
          createTrickDto
      );
    } catch (error) {
      console.log(error.code);
    }
  }

  public async findAll() {
    const querySnapshot = await getDocs(collection(this.fireBaseService.fireStore, "tricks"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });

    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
