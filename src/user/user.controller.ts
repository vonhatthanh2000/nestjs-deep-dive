import { JwtAuthGuard } from '@guards';
import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { CurrentUser } from '@decorators';
import { UpdateUserDto } from './dto';
import { LocalGuard } from 'src/common/guards/local-auth.guard';

@ApiBearerAuth()
@ApiTags('users')
@UseGuards(LocalGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@CurrentUser() user: User) {
    return user;
  }

  @Patch()
  updateUser(@CurrentUser() userId: number, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(userId, dto);
  }
}
