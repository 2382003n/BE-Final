import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Layanan } from './layanan.entity';
import { CreateLayananDto } from './dto/create-layanan.dto';
import { UpdateLayananDto } from './dto/update-layanan.dto';

@Injectable()
export class LayananService {
  constructor(
    @InjectRepository(Layanan)
    private layananRepository: Repository<Layanan>,
  ) {}

  async create(createLayananDto: CreateLayananDto): Promise<Layanan> {
     // Cek duplikasi nama layanan
    const existing = await this.layananRepository.findOne({ where: { nama_layanan: createLayananDto.nama_layanan } });
    if (existing) {
      throw new ConflictException(`Layanan dengan nama ${createLayananDto.nama_layanan} sudah ada`);
    }

    const layanan = this.layananRepository.create(createLayananDto);
     try {
        return await this.layananRepository.save(layanan);
    } catch (error) {
         throw new InternalServerErrorException('Could not save layanan');
    }
  }

  async findAll(): Promise<Layanan[]> {
    return this.layananRepository.find();
  }

  async findOne(id: number): Promise<Layanan> {
    const layanan = await this.layananRepository.findOneBy({ id });
    if (!layanan) {
      throw new NotFoundException(`Layanan with ID ${id} not found`);
    }
    return layanan;
  }

   async findByNama(nama: string): Promise<Layanan | null> {
     return this.layananRepository.findOne({ where: { nama_layanan: nama } });
   }

  async update(id: number, updateLayananDto: UpdateLayananDto): Promise<Layanan> {
    const layanan = await this.findOne(id); // Memastikan layanan ada

    // Cek potensi duplikasi nama jika diubah
    if (updateLayananDto.nama_layanan && updateLayananDto.nama_layanan !== layanan.nama_layanan) {
        const existing = await this.findByNama(updateLayananDto.nama_layanan);
        if (existing && existing.id !== id) {
            throw new ConflictException(`Layanan dengan nama ${updateLayananDto.nama_layanan} sudah ada`);
        }
    }

    Object.assign(layanan, updateLayananDto);
     try {
         return await this.layananRepository.save(layanan);
    } catch (error) {
         throw new InternalServerErrorException('Could not update layanan');
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.layananRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Layanan with ID ${id} not found`);
    }
  }
}