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

import { CoffeService } from '../../services/coffe.service/coffe.service';
import { HttpExceptionFilter } from '../../fIlters/http-eception.filter';
import { UserRole } from '../../entity/user';
import { Role } from '../../decorator/role';
import { RoleGuard } from '../../guard/role.guard/role.guard';
import { CoffeDto } from '../../dto/coffe.dto';
import { CoffeUpdateDto } from '../../dto/coffeUpdateDto';

@Controller('coffe')
@UseFilters(new HttpExceptionFilter())
export class CoffeController {
  constructor(private readonly coffeService: CoffeService) {}

  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  @Post()
  async create(@Body() coffe: CoffeDto, @Req() req: any) {
    return await this.coffeService.create(coffe, req.user.sub);
  }

  @Get('/all')
  async findAll() {
    return await this.coffeService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
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
