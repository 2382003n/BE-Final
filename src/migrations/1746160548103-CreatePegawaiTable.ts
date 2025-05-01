import { MigrationInterface, QueryRunner } from 'typeorm';

// Timestamp unik berikutnya, contoh: 1746160548103
export class CreatePegawaiTable1746160548103 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE pegawai (
            id SERIAL PRIMARY KEY,
            nama_pegawai VARCHAR(100) NOT NULL,
            posisi VARCHAR(50) NOT NULL,
            gaji DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE pegawai;`);
  }
}