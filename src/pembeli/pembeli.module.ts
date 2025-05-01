import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PembeliService } from './pembeli.service';
import { PembeliController } from './pembeli.controller';
import { Pembeli } from './pembeli.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pembeli])],
  controllers: [PembeliController],
  providers: [PembeliService],
  exports: [PembeliService], // Ekspor jika service ini dibutuhkan module lain
})
export class PembeliModule {}