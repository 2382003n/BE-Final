import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator';

export class CreatePembeliDto {
  @ApiProperty({ example: 'Budi Santoso', description: 'Nama lengkap pembeli' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  nama_pembeli: string;

  @ApiProperty({ example: '081234567890', description: 'Nomor telepon unik pembeli' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(\+62|62|0)8[1-9][0-9]{6,11}$/, { message: 'Nomor telepon tidak valid' }) // Contoh Regex Indonesia
  no_tlp: string;

  @ApiPropertyOptional({ example: 'Jl. Merdeka No. 10, Bandung', description: 'Alamat pembeli (opsional)' })
  @IsString()
  @IsOptional()
  alamat?: string;
}