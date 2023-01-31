import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { TricksModule } from './modules/tricks/tricks.module';
import { FirebaseService } from './firebase/firebase.service';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [
    AuthModule,
    TricksModule,
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  providers: [FirebaseService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('users');
  }
}
