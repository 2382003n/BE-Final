import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pegawai } from './pegawai.entity';
import { CreatePegawaiDto } from './dto/create-pegawai.dto';
import { UpdatePegawaiDto } from './dto/update-pegawai.dto';

@Injectable()
export class PegawaiService {
  constructor(
    @InjectRepository(Pegawai)
    private pegawaiRepository: Repository<Pegawai>,
  ) {}

  async create(createPegawaiDto: CreatePegawaiDto): Promise<Pegawai> {
    const pegawai = this.pegawaiRepository.create(createPegawaiDto);
     try {
        return await this.pegawaiRepository.save(pegawai);
    } catch (error) {
         throw new InternalServerErrorException('Could not save pegawai');
    }
  }

  async findAll(): Promise<Pegawai[]> {
    return this.pegawaiRepository.find();
  }

  async findOne(id: number): Promise<Pegawai> {
    const pegawai = await this.pegawaiRepository.findOneBy({ id });
    if (!pegawai) {
      throw new NotFoundException(`Pegawai with ID ${id} not found`);
    }
    return pegawai;
  }

  async update(id: number, updatePegawaiDto: UpdatePegawaiDto): Promise<Pegawai> {
    const pegawai = await this.findOne(id); // Memastikan pegawai ada
    Object.assign(pegawai, updatePegawaiDto);
     try {
         return await this.pegawaiRepository.save(pegawai);
    } catch (error) {
         throw new InternalServerErrorException('Could not update pegawai');
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.pegawaiRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Pegawai with ID ${id} not found`);
    }
  }
}