import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/decorator/role';
import { CoffeDto } from 'src/dto/coffe.dto';
import { UserRole } from 'src/entity/user';
import { RoleGuard } from 'src/guard/role.guard';

import { CoffeService } from '../services/coffe.service';


@Controller('coffe')
export class CoffeController {
  constructor(private readonly coffeService: CoffeService) {}

  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
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
  
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Patch('/:id')
  async updateDescription(@Param('id',new ParseUUIDPipe()) id: string, @Body() { description }) {
    return await this.coffeService.updateDescription(id, description);
  }

  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Patch('/:id')
  async updatePrice(@Param('id',new ParseUUIDPipe()) id: string, @Body() { price }) {
    return await this.coffeService.updatePrice(id, price );
  }

  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Delete('/:id')
  async remove(@Param('id',new ParseUUIDPipe()) id: string) {
    return await this.coffeService.remove(id);
  }
}
