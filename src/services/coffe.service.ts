import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CoffeDto } from 'src/dto/coffe.dto';
import { Coffe } from 'src/entity/coffe';
import { CoffeRepossitory } from 'src/repositories/coffe-repository';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class CoffeService {
  constructor(private coffeRepossitory: CoffeRepossitory) {}

  async create(coffeDto: CoffeDto, creatorid: string): Promise<Coffe> {
    const coffe = { id: uuidv4(), creator: creatorid, ...coffeDto };
    await this.coffeRepossitory.createCoffe(coffe);
    return coffe;
  }

  async findAll(): Promise<Coffe[]> {
    return this.coffeRepossitory.findAll();
  }

  async findOne(id: string): Promise<Coffe> {
    const coffe = await this.coffeRepossitory.findOnebyId(id);
    if (!coffe) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }
    return coffe;
  }

  async update(id: string, updatedcoffe: CoffeDto): Promise<void> {
    await this.coffeRepossitory.updateCoffe(id, updatedcoffe);
  }

  async remove(id: string): Promise<void> {
    await this.coffeRepossitory.removeCoffe(id);
  }
}
