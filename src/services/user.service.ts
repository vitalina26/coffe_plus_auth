import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/dto/registerDto';
import { Coffe } from 'src/entity/coffe';
import { User } from 'src/entity/user';
import { UserRepossitory } from 'src/repositories/user-repository';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private userRepossitory: UserRepossitory) { }
  
      async findAllUsers() :Promise<User[]>{
        return this.userRepossitory.findAllUsers();
      }
        
      async findById(id: string):Promise<User> {
        const user = await this.userRepossitory.findById(id);
        return user;
              
      }
        
      async update(id: string, updatedUser: RegisterDto,): Promise<void> {
         await this.userRepossitory.updateUser( id, updatedUser);
      }
         
      async remove(id: string):Promise<void> {
            await this.userRepossitory.removeUser(id)   
      }
    
}
