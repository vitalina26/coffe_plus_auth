import { HttpException, HttpStatus } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterDto } from "src/dto/registerDto";
import { User } from "src/entity/user";
import { Repository,DataSource } from "typeorm";

@Injectable()
export class UserRepossitory extends Repository<User>{
    constructor(private dataSource: DataSource) { 
        super(User,dataSource.createEntityManager())
    }
    async findByEmail(email: string):Promise<User> {
        return await this.findOne({ where: { email } });
       
    }
      
    async createUser(user: User) {
        await this.save(user);
 }
    
    async findAllUsers() :Promise<User[]>{
        return this.find();
    }
    
    async findById(id: string):Promise<User> {
        return await this.findOne({ where: { id } });
    }
    
     async updateUser(id: string, updatedUser: RegisterDto,): Promise<void> {
        await this.update({ id }, updatedUser);
     }
     
     async removeUser(id: string):Promise<void> {
        await this.delete({id})   
    }

    
}