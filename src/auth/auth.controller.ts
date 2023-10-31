import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from './dto';
import { CurrentUser, Public } from '../common/decorators';
import { UserPayload } from '../common/interfaces';
import { LocalGuard } from '../common/guards';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @Public()
  @ApiBody({ type: CreateUserDto })
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  @Public()
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('profile')
  @UseGuards(LocalGuard)
  @ApiBearerAuth()
  getProfile(@CurrentUser() user: UserPayload) {
    return user;
  }
}
