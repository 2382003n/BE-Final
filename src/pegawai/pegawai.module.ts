import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PegawaiService } from './pegawai.service';
import { PegawaiController } from './pegawai.controller';
import { Pegawai } from './pegawai.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pegawai])],
  controllers: [PegawaiController],
  providers: [PegawaiService],
  exports: [PegawaiService],
})
export class PegawaiModule {}