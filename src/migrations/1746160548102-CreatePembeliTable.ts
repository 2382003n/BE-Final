import { MigrationInterface, QueryRunner } from 'typeorm';

// Timestamp unik berikutnya, contoh: 1746160548102
export class CreatePembeliTable1746160548102 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE pembeli (
            id SERIAL PRIMARY KEY,
            nama_pembeli VARCHAR(100) NOT NULL,
            no_tlp VARCHAR(20) UNIQUE NOT NULL,
            alamat TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE pembeli;`);
  }
}