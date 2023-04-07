import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/decorator/role';
import { OrderItemDto } from 'src/dto/order-item.dto';
import { OrderItemUpdateDto } from 'src/dto/orderItemUpdateDto';
import { UserRole } from 'src/entity/user';
import { HttpExceptionFilter } from 'src/fIlters/http-eception.filter';
import { RoleGuard } from 'src/guard/role.guard';
import { OrderItemService } from 'src/services/order-item.service';

@Controller('order-item')
@UseFilters(new HttpExceptionFilter())
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  @Post()
  async create(@Body() orderItem: OrderItemDto) {
    return await this.orderItemService.create(orderItem);
  }

  @Get()
  async findAll() {
    return await this.orderItemService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.orderItemService.findOne(id);
  }

  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  @Put('/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() coffeupdate: OrderItemUpdateDto,
  ) {
    return await this.orderItemService.update(id, coffeupdate);
  }

  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  @Delete('/:id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.orderItemService.remove(id);
  }
}
