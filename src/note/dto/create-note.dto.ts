import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({ example: 'Thanh code' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'BE' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'Codelight' })
  @IsString()
  url: string;
}
