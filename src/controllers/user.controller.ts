import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/decorator/role';
import { UserRole } from 'src/entity/user';
import { RoleGuard } from 'src/guard/role.guard';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
    
    constructor(private readonly coffeService: UserService) {}
    @Role(UserRole.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    @Get()
  async findAllUsers() {
    return await this.coffeService.findAllUsers();
  }


 @UseGuards(AuthGuard)
  @Get('/:email')
  async findByEmail(@Param('email') email: string) {
    return await this.coffeService.findByEmail(email);
  }
  
  
  @UseGuards(AuthGuard)
  @Patch('/:email')
  async updateDescription(@Param('email') email: string, @Body() { firstname }) {
      return await this.coffeService.updateFirstName(email,firstname );
  }

 
  @UseGuards(AuthGuard)
  @Patch('/:email')
  async updateSecondName(@Param('email') email: string, @Body() { secondname }) {
    return await this.coffeService.updateSecondName(email, secondname );
  }

  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Delete('/:email')
  async remove(@Param('email') email: string) {
    return await this.coffeService.remove(email);
  }
}
