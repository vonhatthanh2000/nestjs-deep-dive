import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from './dto';
import { CurrentUser, Public } from '@decorators';
import { UserPayload } from '@interfaces';
import { JwtGuard, LocalGuard } from '@guards';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  @Public()
  @ApiBody({ type: CreateUserDto })
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  // @Post('login')
  // @ApiBody({ type: LoginDto })
  // @Public()
  // login(@Body() dto: LoginDto) {
  //   return this.authService.login(dto);
  // }

  @UseGuards(LocalGuard)
  @Post('login')
  @ApiBody({ type: LoginDto })
  localLogin(@CurrentUser() user: UserPayload) {
    console.log('user :>> ', user);
    return this.authService.signJwtToken(user);
  }

  @Get('profile')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  getUserProfile(@CurrentUser() user: UserPayload) {
    return this.userService.getUserById(user.id);
  }
}
