import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity({ name: 'layanan' })
  export class Layanan {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 100, unique: true, nullable: false })
    nama_layanan: string;
  
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    harga_layanan: number;
  
    @Column({ length: 10, nullable: false, default: 'kg' })
    satuan: string; // 'kg', 'pcs', 'set', dll.
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
  }