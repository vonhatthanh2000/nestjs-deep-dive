import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from './dto';
import { JwtAuthGuard } from '@guards';
import { CurrentUser, Public } from '@decorators';
import { UserPayload } from '@interfaces';

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
    return this.authService.register(dto);
  }

  @Post('login')
  @Public()
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('profile')
  getProfile(@CurrentUser() user: UserPayload) {
    return user;
  }
}
