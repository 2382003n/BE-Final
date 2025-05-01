import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { PegawaiService } from './pegawai.service';
  import { CreatePegawaiDto } from './dto/create-pegawai.dto';
  import { UpdatePegawaiDto } from './dto/update-pegawai.dto';
  import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
  
  @ApiTags('Pegawai')
  @ApiBearerAuth()
  @Controller('pegawai')
  export class PegawaiController {
    constructor(private readonly pegawaiService: PegawaiService) {}
  
    @Post()
    @ApiOperation({ summary: 'Create a new pegawai' })
    @ApiResponse({ status: 201, description: 'Pegawai created successfully.'})
    @ApiResponse({ status: 400, description: 'Bad Request (Validation Error).'})
    create(@Body() createPegawaiDto: CreatePegawaiDto) {
      return this.pegawaiService.create(createPegawaiDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all pegawai' })
     @ApiResponse({ status: 200, description: 'Returns all pegawai.'})
    findAll() {
      return this.pegawaiService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get a pegawai by ID' })
     @ApiResponse({ status: 200, description: 'Returns the pegawai data.'})
     @ApiResponse({ status: 404, description: 'Pegawai not found.'})
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.pegawaiService.findOne(id);
    }
  
    @Patch(':id')
     @ApiOperation({ summary: 'Update pegawai by ID' })
     @ApiResponse({ status: 200, description: 'Pegawai updated successfully.'})
     @ApiResponse({ status: 404, description: 'Pegawai not found.'})
     @ApiResponse({ status: 400, description: 'Bad Request (Validation Error).'})
    update(@Param('id', ParseIntPipe) id: number, @Body() updatePegawaiDto: UpdatePegawaiDto) {
      return this.pegawaiService.update(id, updatePegawaiDto);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a pegawai by ID' })
     @ApiResponse({ status: 204, description: 'Pegawai deleted successfully.'})
     @ApiResponse({ status: 404, description: 'Pegawai not found.'})
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
       await this.pegawaiService.remove(id);
    }
  }