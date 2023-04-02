import { HttpException, Injectable,UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from '../dto/registerDto';
import { LoginDto } from '../dto/loginDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/entity/user';
import { Repository } from 'typeorm';
import { hash, genSalt,compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export interface JWTTokens {
  accessToken: string;
}

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,

  ) { }




  async createUser(registerDto: RegisterDto) {
    const existingUser = await this.userRepository.findOne({
      where: {email : registerDto.email},
    })
    if (existingUser) {
      throw new HttpException('email already registrated', 400);
    }
    const salt = await genSalt();
    const user = {
      firstname: registerDto.firstname,
      secondname: registerDto.secondname,
      phonenumber: registerDto.phonenumber,
      email: registerDto.email,
      userSalt: salt,
      password: await this.hashPassword(registerDto.password, salt),
      role: UserRole.USER,
      
    }
    this.userRepository.save(user)
    return user;
    
  }



  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('Invalid data', 400);
    }

    const hashPassword = await this.hashPassword(password, user.userSalt);
    //(hashPassword === user.password)

    if (!(hashPassword === user.password)) {
      throw new HttpException('Invalid data', 400);
    }
    const payload = {
      sub: user.email,
      role: user.role,
    };
    
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }



  private hashPassword(password:string, salt:string) {
    return hash(password, salt)
  }


  
}