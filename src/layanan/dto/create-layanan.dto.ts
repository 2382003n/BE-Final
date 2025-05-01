import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, Length, Max, Min } from 'class-validator';

// Definisikan enum untuk satuan jika ingin membatasi pilihan
export enum SatuanLayanan {
    KILOGRAM = 'kg',
    PCS = 'pcs',
    SET = 'set',
    METER_PERSEGI = 'm2'
}

export class CreateLayananDto {
  @ApiProperty({ example: 'Cuci Kering Lipat', description: 'Nama layanan laundry' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  nama_layanan: string;

  @ApiProperty({ example: 7000.00, description: 'Harga layanan per satuan' })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Min(0)
  @Max(1000000) // Harga maksimal per satuan (contoh)
  harga_layanan: number;

  @ApiProperty({ example: 'kg', description: 'Satuan layanan (kg, pcs, set, m2)', enum: SatuanLayanan})
  @IsNotEmpty()
  @IsEnum(SatuanLayanan, { message: 'Satuan tidak valid. Pilih: kg, pcs, set, m2' })
  satuan: SatuanLayanan;
}