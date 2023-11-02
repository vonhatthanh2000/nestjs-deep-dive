import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async updateUser(userId: number, dto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    delete user.password;
    return user;
  }

  async getUserById(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }
}
