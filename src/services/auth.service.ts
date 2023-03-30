import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../dto/registerDto';
import { LoginDto } from '../dto/loginDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

  constructor(
   @InjectRepository(User)  private userRepository:Repository<User>
    ){}

  async createUser(registerDto: RegisterDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
