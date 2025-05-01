import { PartialType } from '@nestjs/mapped-types';
import { CreatePembeliDto } from './create-pembeli.dto';

// Semua field dari CreatePembeliDto menjadi opsional
export class UpdatePembeliDto extends PartialType(CreatePembeliDto) {}