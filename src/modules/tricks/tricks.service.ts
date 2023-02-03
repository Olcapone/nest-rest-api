import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTrickDto } from './dto/create-trick.dto';
import { UpdateTrickDto } from './dto/update-trick.dto';
import {
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  DocumentReference,
  doc,
  collection
} from 'firebase/firestore';
import { FirebaseService } from '../../firebase/firebase.service';

@Injectable()
export class TricksService {
  constructor(private fireBaseService: FirebaseService) {}
  public async create(createTrickDto: CreateTrickDto) {
    try {
      await addDoc(this.fireBaseService.tricksCollection, createTrickDto);
    } catch (error) {
      console.log(error.code);
    }
  }

  public async findAll() {
    let tricks = [];
    const querySnapshot = await getDocs(this.fireBaseService.tricksCollection);

    querySnapshot.forEach((doc) => {
      tricks.push(doc.data());
    });

    return tricks;
  }

  public async findOne(id: string) {
    const docRef = doc(this.fireBaseService.fireStore, 'tricks', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { data: docSnap.data() };
    } else {
      return {
        data: {
          message: 'tricks not find!'
        }
      };
    }
  }

  public async update(id: string, updateTrickData: UpdateTrickDto) {
    await updateDoc(doc(this.fireBaseService.fireStore, 'tricks', id), {
      ...updateTrickData
    });
    return `This action updates a #${id} user`;
  }

  public async remove(id: string) {
    await deleteDoc(doc(this.fireBaseService.fireStore, 'tricks', id));
    return `This action removes a #${id} user`;
  }
}
