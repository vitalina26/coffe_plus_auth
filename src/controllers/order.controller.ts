import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/decorator/role';
import { OrderDto } from 'src/dto/orderDto';
import { OrderUpdateDto } from 'src/dto/orderUpdateDto';
import { UserRole } from 'src/entity/user';
import { HttpExceptionFilter } from 'src/fIlters/http-eception.filter';
import { RoleGuard } from 'src/guard/role.guard';
import { OrderService } from 'src/services/order.service';

@Controller('order')
@UseFilters(new HttpExceptionFilter())
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  @Post()
  async create(@Body() orderItem: OrderDto, @Req() req: any) {
    return await this.orderService.create(req.user.id, orderItem);
  }

  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  @Get()
  async findAll() {
    return await this.orderService.findAll();
  }

  @UseGuards(AuthGuard())
  @Get('/:id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.orderService.findOne(id);
  }

  @UseGuards(AuthGuard())
  @Put('/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderupdate: OrderUpdateDto,
  ) {
    return await this.orderService.update(id, orderupdate);
  }

  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  @Delete('/:id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.orderService.remove(id);
  }
}
