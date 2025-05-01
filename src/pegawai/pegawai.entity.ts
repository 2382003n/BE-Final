import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity({ name: 'pegawai' })
  export class Pegawai {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 100, nullable: false })
    nama_pegawai: string;
  
    @Column({ length: 50, nullable: false })
    posisi: string;
  
    @Column({ type: 'decimal', precision: 12, scale: 2, nullable: false, default: 0.00 })
    gaji: number; // TypeORM akan handle konversi ke string saat save jika tipe DB adalah numeric/decimal
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
  }