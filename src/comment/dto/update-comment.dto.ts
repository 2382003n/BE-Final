import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({
    description: 'The content of the comment',
    example: 'Updated comment content...',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  content?: string;
} 