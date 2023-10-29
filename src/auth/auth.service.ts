import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { CreateUserDto, LoginDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserPayload } from '@interfaces';

@Injectable()
export class AuthService {
  private logger: Logger;

  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.logger = new Logger(AuthService.name);
  }

  getHello(): string {
    return 'Hello World!';
  }

  async register(dto: CreateUserDto) {
    const hashedPassword = await argon.hash(dto.password);
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          password: hashedPassword,
        },
        select: {
          id: true,
          email: true,
          name: true,
        },
      });
      return user;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async login(dto: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const passwordMatch = await argon.verify(user.password, dto.password);

    if (!passwordMatch) {
      throw new ForbiddenException('Wrong password');
    }

    return this.signJwtToken({
      id: user.id,
      email: user.email,
    });
  }

  async signJwtToken(payload: UserPayload): Promise<{ accessToken: string }> {
    const jwtString = await this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      secret: this.configService.get('JWT_SECRET'),
    });
    return {
      accessToken: jwtString,
    };
  }
}
