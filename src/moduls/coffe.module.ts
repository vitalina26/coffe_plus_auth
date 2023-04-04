import { Module } from '@nestjs/common';
import { CoffeService } from '../services/coffe.service';
import { CoffeController } from '../controllers/coffe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffe } from 'src/entity/coffe';
import { AuthModule } from './auth.module';
import { CoffeRepossitory } from 'src/repositories/coffe-repository';
import { RoleGuard } from 'src/guard/role.guard';

@Module({
  controllers: [CoffeController],
  providers: [CoffeService,CoffeRepossitory],
  imports: [TypeOrmModule.forFeature([Coffe]), AuthModule,],

})
export class CoffeModule {}
