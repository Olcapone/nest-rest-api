import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './modules/auth/auth.module'
import { FirebaseService } from './firebase/firebase.service'

@Module({
  imports: [AuthModule, ConfigModule.forRoot({
    isGlobal: true,
  })],
  providers: [FirebaseService],
})
export class AppModule {}
