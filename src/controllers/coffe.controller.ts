import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { CoffeDto } from 'src/dto/coffe.dto';
import { AccessTokenGuard } from 'src/guard/access-token.guard';
import { CoffeService } from '../services/coffe.service';


@Controller('coffe')
export class CoffeController {
  constructor(private readonly coffeService: CoffeService) {}

  @UseGuards(AccessTokenGuard)
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

  @UseGuards(AccessTokenGuard)
  @Patch('/:id')
  async update(@Param('id',new ParseUUIDPipe()) id: string, @Body() { description }) {
    return await this.coffeService.update(id, description);
  }
  
  @UseGuards(AccessTokenGuard)
  @Delete('/:id')
  async remove(@Param('id',new ParseUUIDPipe()) id: string) {
    return await this.coffeService.remove(id);
  }
}
