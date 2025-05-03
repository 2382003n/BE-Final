import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty({
    description: 'The title of the post',
    example: 'Updated Post Title',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  title?: string;

  @ApiProperty({
    description: 'The content of the post',
    example: 'Updated post content...',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  content?: string;
} 