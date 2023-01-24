import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import {ConfigModule} from "@nestjs/config"
import {FirebaseService} from "../../firebase/firebase.service"

@Module({
  imports: [JwtModule.register({}), ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, FirebaseService]
})
export class AuthModule {}
