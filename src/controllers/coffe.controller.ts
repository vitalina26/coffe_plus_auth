import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CoffeDto } from 'src/dto/coffe.dto';
import { CoffeService } from '../services/coffe.service';


@Controller('coffe')
export class CoffeController {
  constructor(private readonly coffeService: CoffeService) {}

  @Post()
  async create(@Body() coffe: CoffeDto) {
    return await this.coffeService.create(coffe);
  }

  @Get()
  async findAll() {
    return await this.coffeService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id',new ParseUUIDPipe()) id: string) {
    return await this.coffeService.findOne(id);
  }

  @Patch('/:id')
  async update(@Param('id',new ParseUUIDPipe()) id: string, @Body() { description }) {
    return await this.coffeService.update(id, description);
  }

  @Delete('/:id')
  async remove(@Param('id',new ParseUUIDPipe()) id: string) {
    return await this.coffeService.remove(id);
  }
}
