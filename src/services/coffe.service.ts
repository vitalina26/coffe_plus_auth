import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CoffeDto } from 'src/dto/coffe.dto';
import { CoffeUpdateDto } from 'src/dto/coffeUpdateDto';
import { Coffe } from 'src/entity/coffe';
import { CoffeRepossitory } from 'src/repositories/coffe-repository';
import { UserRepossitory } from 'src/repositories/user-repository';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class CoffeService {
  constructor(
    private coffeRepossitory: CoffeRepossitory,
    private userRepository: UserRepossitory,
  ) {}

  async create(coffeDto: CoffeDto, creatorid: string): Promise<Coffe> {
    const user = await this.userRepository.findById(creatorid);
    if (!user) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }
    const coffe = { id: uuidv4(), creator: user, ...coffeDto };
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

  async update(id: string, updatedcoffe: CoffeUpdateDto): Promise<void> {
    const coffe = await this.coffeRepossitory.findOnebyId(id);
    if (!coffe) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }
    await this.coffeRepossitory.updateCoffe(id, updatedcoffe);
  }

  async remove(id: string): Promise<void> {
    const coffe = await this.coffeRepossitory.findOnebyId(id);
    if (!coffe) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }
    await this.coffeRepossitory.removeCoffe(id);
  }
}
