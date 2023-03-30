import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoffeDto } from 'src/dto/coffe.dto';
import { Coffe } from 'src/entity/coffe';
import { Repository } from 'typeorm';

@Injectable()
export class CoffeService {

  constructor(@InjectRepository(Coffe) private coffeRepossitory: Repository<Coffe>) {
    
  }
  async create(coffe: CoffeDto):Promise<void> {
    await this.coffeRepossitory.save(coffe);
  }

  async findAll() :Promise<Coffe[]>{
    return this.coffeRepossitory.find();
  }

  async findOne(id: string):Promise<Coffe> {
    const coffe = await this.coffeRepossitory.findOne({ where: { id } });
    if (!coffe) {
      throw new HttpException('NotFound',HttpStatus.NOT_FOUND)
    }
    return coffe;
      
  }

  async update(id: string, description:string ):Promise<void> {
    await this.coffeRepossitory.update({ id }, { description });
  }

 async remove(id: string):Promise<void> {
    await this.coffeRepossitory.delete({id})   
  }
}
