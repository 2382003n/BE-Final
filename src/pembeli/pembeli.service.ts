import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pembeli } from './pembeli.entity';
import { CreatePembeliDto } from './dto/create-pembeli.dto';
import { UpdatePembeliDto } from './dto/update-pembeli.dto';

@Injectable()
export class PembeliService {
  constructor(
    @InjectRepository(Pembeli)
    private pembeliRepository: Repository<Pembeli>,
  ) {}

  async create(createPembeliDto: CreatePembeliDto): Promise<Pembeli> {
    // Cek duplikasi nomor telepon
    const existing = await this.pembeliRepository.findOne({ where: { no_tlp: createPembeliDto.no_tlp } });
    if (existing) {
      throw new ConflictException(`Nomor telepon ${createPembeliDto.no_tlp} sudah terdaftar`);
    }

    const pembeli = this.pembeliRepository.create(createPembeliDto);
    try {
        return await this.pembeliRepository.save(pembeli);
    } catch (error) {
         throw new InternalServerErrorException('Could not save pembeli');
    }
  }

  async findAll(): Promise<Pembeli[]> {
    return this.pembeliRepository.find();
  }

  async findOne(id: number): Promise<Pembeli> {
    const pembeli = await this.pembeliRepository.findOneBy({ id });
    if (!pembeli) {
      throw new NotFoundException(`Pembeli with ID ${id} not found`);
    }
    return pembeli;
  }

   async findByTlp(no_tlp: string): Promise<Pembeli | null> {
     return this.pembeliRepository.findOne({ where: { no_tlp } });
   }

  async update(id: number, updatePembeliDto: UpdatePembeliDto): Promise<Pembeli> {
    const pembeli = await this.findOne(id); // Ensure pembeli exists

     // Cek potensi duplikasi nomor telepon jika diubah
    if (updatePembeliDto.no_tlp && updatePembeliDto.no_tlp !== pembeli.no_tlp) {
        const existing = await this.findByTlp(updatePembeliDto.no_tlp);
        if (existing && existing.id !== id) {
            throw new ConflictException(`Nomor telepon ${updatePembeliDto.no_tlp} sudah terdaftar`);
        }
    }

    Object.assign(pembeli, updatePembeliDto);
    try {
         return await this.pembeliRepository.save(pembeli);
    } catch (error) {
         throw new InternalServerErrorException('Could not update pembeli');
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.pembeliRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Pembeli with ID ${id} not found`);
    }
  }
}