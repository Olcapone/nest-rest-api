import {Body, Controller, Post} from '@nestjs/common'
import { AuthService } from './auth.service'
import {AuthDto} from "./dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  public signup(@Body()  dto: AuthDto) {
    return this.authService.signup(dto)
  }

  @Post('login')
  public login(@Body()  dto: AuthDto) {
    return this.authService.login(dto)
  }
}
