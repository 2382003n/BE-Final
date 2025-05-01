import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LayananService } from './layanan.service';
import { LayananController } from './layanan.controller';
import { Layanan } from './layanan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Layanan])],
  controllers: [LayananController],
  providers: [LayananService],
  exports: [LayananService],
})
export class LayananModule {}