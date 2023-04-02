import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoffeDto } from 'src/dto/coffe.dto';
import { Coffe } from 'src/entity/coffe';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class CoffeService {

  constructor(@InjectRepository(Coffe) private coffeRepossitory: Repository<Coffe>) {
    
  }
  async create(coffeDto: CoffeDto): Promise<Coffe> {
    const coffe = {id : uuidv4(), ...coffeDto}
    await this.coffeRepossitory.save(coffe);
    return coffe;

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

  async updateDescription(id: string, description:string ):Promise<void> {
    await this.coffeRepossitory.update({ id }, { description });
  }
 
  async updatePrice(id: string, price:number ):Promise<void> {
    await this.coffeRepossitory.update({ id }, { price });
  }


 async remove(id: string):Promise<void> {
    await this.coffeRepossitory.delete({id})   
  }
}
