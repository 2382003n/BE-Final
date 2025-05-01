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
  import { PembeliService } from './pembeli.service';
  import { CreatePembeliDto } from './dto/create-pembeli.dto';
  import { UpdatePembeliDto } from './dto/update-pembeli.dto';
  import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
  
  @ApiTags('Pembeli')
  @ApiBearerAuth()
  @Controller('pembeli')
  export class PembeliController {
    constructor(private readonly pembeliService: PembeliService) {}
  
    @Post()
    @ApiOperation({ summary: 'Create a new pembeli' })
    @ApiResponse({ status: 201, description: 'Pembeli created successfully.'})
    @ApiResponse({ status: 409, description: 'Nomor telepon already exists.'})
    @ApiResponse({ status: 400, description: 'Bad Request (Validation Error).'})
    create(@Body() createPembeliDto: CreatePembeliDto) {
      return this.pembeliService.create(createPembeliDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all pembeli' })
    @ApiResponse({ status: 200, description: 'Returns all pembeli.'})
    findAll() {
      return this.pembeliService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get a pembeli by ID' })
    @ApiResponse({ status: 200, description: 'Returns the pembeli data.'})
    @ApiResponse({ status: 404, description: 'Pembeli not found.'})
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.pembeliService.findOne(id);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Update pembeli by ID' })
     @ApiResponse({ status: 200, description: 'Pembeli updated successfully.'})
     @ApiResponse({ status: 404, description: 'Pembeli not found.'})
     @ApiResponse({ status: 409, description: 'Conflict on unique fields.'})
     @ApiResponse({ status: 400, description: 'Bad Request (Validation Error).'})
    update(@Param('id', ParseIntPipe) id: number, @Body() updatePembeliDto: UpdatePembeliDto) {
      return this.pembeliService.update(id, updatePembeliDto);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT) // Return 204 No Content on successful delete
    @ApiOperation({ summary: 'Delete a pembeli by ID' })
    @ApiResponse({ status: 204, description: 'Pembeli deleted successfully.'})
    @ApiResponse({ status: 404, description: 'Pembeli not found.'})
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
       await this.pembeliService.remove(id);
    }
  }