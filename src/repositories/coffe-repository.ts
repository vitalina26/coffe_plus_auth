import { Injectable } from '@nestjs/common/decorators';
import { CoffeDto } from 'src/dto/coffe.dto';
import { Coffe } from 'src/entity/coffe';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class CoffeRepossitory extends Repository<Coffe> {
  constructor(private dataSource: DataSource) {
    super(Coffe, dataSource.createEntityManager());
  }

  async createCoffe(coffe: Coffe) {
    await this.save(coffe);
  }

  async findAll(): Promise<Coffe[]> {
    return this.find();
  }

  async findOnebyId(id: string): Promise<Coffe> {
    return await this.findOne({ where: { id } });
  }

  async updateCoffe(id: string, updatedcoffe: CoffeDto): Promise<void> {
    await this.update({ id }, updatedcoffe);
  }

  async removeCoffe(id: string): Promise<void> {
    await this.delete({ id });
  }
}
