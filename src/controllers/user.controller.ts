import { Body, Controller, Delete, Get, Param, Patch, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/decorator/role';
import { CoffeDto } from 'src/dto/coffe.dto';
import { RegisterDto } from 'src/dto/registerDto';
import { UserRole } from 'src/entity/user';
import { RoleGuard } from 'src/guard/role.guard';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
    
    constructor(private readonly userService: UserService) {}
    @Role(UserRole.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    @Get()
  async findAllUsers() {
    return await this.userService.findAllUsers();
  }


 @UseGuards(AuthGuard)
  @Get('/:id')
  async findById(@Param('id') id: string) {
    return await this.userService.findById(id);
  }
  
  
  @UseGuards(AuthGuard)
  @Put('/')
  async update(@Req() req:any , @Body() userupdate: RegisterDto) {
      return await this.userService.update(req.user.id, userupdate);
  }

  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}
