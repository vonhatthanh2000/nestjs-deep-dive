import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto';

@Controller('auth')
export class AuthController {
  // auth service is automatically injected when initializing the controller
  constructor(private authService: AuthService) {}

  @Post()
  getHello(): string {
    return this.authService.getHello();
  }

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return dto;
  }
}
