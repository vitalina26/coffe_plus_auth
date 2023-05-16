import { Injectable } from '@nestjs/common/decorators';

import { Repository, DataSource } from 'typeorm';
import { Coffe } from '../entity/coffe';
import { CoffeUpdateDto } from '../dto/coffeUpdateDto';

@Injectable()
export class CoffeRepossitory extends Repository<Coffe> {
  constructor(private dataSource: DataSource) {
    super(Coffe, dataSource.createEntityManager());
  }

  async createCoffe(coffe: Coffe) {
    await this.insert(coffe);
  }

  async findAll(): Promise<Coffe[]> {
    return this.find();
  }

  async findOnebyId(id: string): Promise<Coffe> {
    return await this.findOne({ where: { id } });
  }

  async updateCoffe(id: string, updatedcoffe: CoffeUpdateDto): Promise<void> {
    await this.update({ id }, updatedcoffe);
  }

  async removeCoffe(id: string): Promise<void> {
    await this.delete({ id });
  }
}
