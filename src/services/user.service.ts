import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/dto/registerDto';
import { User } from 'src/entity/user';
import { UserRepossitory } from 'src/repositories/user-repository';

@Injectable()
export class UserService {
  constructor(private userRepossitory: UserRepossitory) {}

  async findAllUsers(): Promise<User[]> {
    return this.userRepossitory.findAllUsers();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepossitory.findById(id);
    if (!user) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(id: string, updatedUser: RegisterDto): Promise<void> {
    await this.userRepossitory.updateUser(id, updatedUser);
  }

  async remove(id: string): Promise<void> {
    await this.userRepossitory.removeUser(id);
  }
}
