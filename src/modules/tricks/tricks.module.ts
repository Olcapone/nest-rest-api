import { Module } from '@nestjs/common';
import { TricksService } from './tricks.service';
import { TricksController } from './tricks.controller';
import { FirebaseService } from '../../firebase/firebase.service';

@Module({
  controllers: [TricksController],
  providers: [TricksService, FirebaseService]
})
export class TricksModule {}
