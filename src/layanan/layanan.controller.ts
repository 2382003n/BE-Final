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
  import { LayananService } from './layanan.service';
  import { CreateLayananDto } from './dto/create-layanan.dto';
  import { UpdateLayananDto } from './dto/update-layanan.dto';
  import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
  
  @ApiTags('Layanan')
  @ApiBearerAuth()
  @Controller('layanan')
  export class LayananController {
    constructor(private readonly layananService: LayananService) {}
  
    @Post()
    @ApiOperation({ summary: 'Create a new layanan' })
    @ApiResponse({ status: 201, description: 'Layanan created successfully.'})
    @ApiResponse({ status: 409, description: 'Nama layanan already exists.'})
    @ApiResponse({ status: 400, description: 'Bad Request (Validation Error).'})
    create(@Body() createLayananDto: CreateLayananDto) {
      return this.layananService.create(createLayananDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all layanan' })
    @ApiResponse({ status: 200, description: 'Returns all layanan.'})
    findAll() {
      return this.layananService.findAll();
    }
  
    @Get(':id')
     @ApiOperation({ summary: 'Get a layanan by ID' })
     @ApiResponse({ status: 200, description: 'Returns the layanan data.'})
     @ApiResponse({ status: 404, description: 'Layanan not found.'})
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.layananService.findOne(id);
    }
  
    @Patch(':id')
     @ApiOperation({ summary: 'Update layanan by ID' })
     @ApiResponse({ status: 200, description: 'Layanan updated successfully.'})
     @ApiResponse({ status: 404, description: 'Layanan not found.'})
     @ApiResponse({ status: 409, description: 'Conflict on unique fields.'})
     @ApiResponse({ status: 400, description: 'Bad Request (Validation Error).'})
    update(@Param('id', ParseIntPipe) id: number, @Body() updateLayananDto: UpdateLayananDto) {
      return this.layananService.update(id, updateLayananDto);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a layanan by ID' })
    @ApiResponse({ status: 204, description: 'Layanan deleted successfully.'})
    @ApiResponse({ status: 404, description: 'Layanan not found.'})
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
       await this.layananService.remove(id);
    }
  }