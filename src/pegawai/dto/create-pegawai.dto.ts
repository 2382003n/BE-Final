import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString, Length, Max, Min } from 'class-validator';

export class CreatePegawaiDto {
  @ApiProperty({ example: 'Citra Lestari', description: 'Nama lengkap pegawai' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  nama_pegawai: string;

  @ApiProperty({ example: 'Kasir', description: 'Posisi atau jabatan pegawai' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  posisi: string;

  @ApiProperty({ example: 3500000.00, description: 'Gaji bulanan pegawai' })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive() // Gaji harus positif
  @Min(0) // Gaji minimal 0
  @Max(1000000000) // Batas atas gaji (contoh)
  gaji: number;
}