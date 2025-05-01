import { MigrationInterface, QueryRunner } from 'typeorm';

// Timestamp unik berikutnya, contoh: 1746160548104
export class CreateLayananTable1746160548104 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE layanan (
            id SERIAL PRIMARY KEY,
            nama_layanan VARCHAR(100) UNIQUE NOT NULL,
            harga_layanan DECIMAL(10, 2) NOT NULL,
            satuan VARCHAR(10) NOT NULL DEFAULT 'kg', -- Menambahkan satuan (penting untuk laundry)
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE layanan;`);
  }
}