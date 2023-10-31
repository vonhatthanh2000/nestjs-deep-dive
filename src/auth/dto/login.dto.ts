import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail({}, { message: 'Email is not valid' })
  @IsNotEmpty({ message: 'Email is not provided' })
  @ApiProperty({ example: 'thanhvo@codelight.co' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is not provided' })
  @ApiProperty({ example: '123456' })
  password: string;
}
