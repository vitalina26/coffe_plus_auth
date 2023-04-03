import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffe } from 'src/entity/coffe';
import { User } from 'src/entity/user';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepossitory: Repository<User>) { }
        async findAllUsers() :Promise<User[]>{
            return this.userRepossitory.find();
          }
        
          async findByEmail(email: string):Promise<User> {
            const user = await this.userRepossitory.findOne({ where: { email } });
            if (!user) {
              throw new HttpException('NotFound',HttpStatus.NOT_FOUND)
            }
            return user;
              
          }
        
          async updateFirstName(email: string, firstname:string ):Promise<void> {
            await this.userRepossitory.update({ email }, { firstname });
          }
         
          async updateSecondName(email: string, secondname:string ):Promise<void> {
            await this.userRepossitory.update({ email }, { secondname });
          }
        
        
         async remove(email: string):Promise<void> {
            await this.userRepossitory.delete({email})   
          }
    
}
