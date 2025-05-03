import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'The content of the comment',
    example: 'This is a great post!',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  content: string;
} 