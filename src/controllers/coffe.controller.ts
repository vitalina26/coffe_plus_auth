import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  Req,
  Put,
  UseFilters,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/decorator/role';
import { CoffeDto } from 'src/dto/coffe.dto';
import { CoffeUpdateDto } from 'src/dto/coffeUpdateDto';
import { UserRole } from 'src/entity/user';
import { HttpExceptionFilter } from 'src/fIlters/http-eception.filter';
import { RoleGuard } from 'src/guard/role.guard';

import { CoffeService } from '../services/coffe.service';

@Controller('coffe')
@UseFilters(new HttpExceptionFilter())
export class CoffeController {
  constructor(private readonly coffeService: CoffeService) {}

  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  @Post()
  async create(@Body() coffe: CoffeDto, @Req() req: any) {
    return await this.coffeService.create(coffe, req.user.id);
  }

  @Get()
  async findAll() {
    return await this.coffeService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.coffeService.findOne(id);
  }

  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  @Put('/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() coffeupdate: CoffeUpdateDto,
  ) {
    return await this.coffeService.update(id, coffeupdate);
  }

  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  @Delete('/:id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.coffeService.remove(id);
  }
}
