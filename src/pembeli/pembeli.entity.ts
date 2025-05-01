import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity({ name: 'pembeli' }) // Sesuaikan nama tabel
  export class Pembeli {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 100, nullable: false })
    nama_pembeli: string;
  
    @Column({ length: 20, unique: true, nullable: false })
    no_tlp: string;
  
    @Column({ type: 'text', nullable: true }) // Alamat bisa null
    alamat: string | null;
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
  
    // Tambahkan relasi jika perlu, misal ke User atau Transaksi
    // @ManyToOne(() => User, user => user.pembeli) // Contoh relasi ke User
    // user: User;
  }