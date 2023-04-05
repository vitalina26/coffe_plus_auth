import { HttpException, Injectable } from '@nestjs/common';
import { RegisterDto } from '../dto/registerDto';
import { LoginDto } from '../dto/loginDto';
import { UserRole } from 'src/entity/user';
import { hash, genSalt } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRepossitory } from 'src/repositories/user-repository';
import { v4 as uuidv4 } from 'uuid';
export interface JWTTokens {
  accessToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepossitory,
  ) {}

  async createUser(registerDto: RegisterDto) {
    const existingUser = await this.userRepository.findByEmail(
      registerDto.email,
    );
    if (existingUser) {
      throw new HttpException('User with this email exists', 400);
    }
    const salt = await genSalt();
    const user = {
      id: uuidv4(),
      firstname: registerDto.firstname,
      secondname: registerDto.secondname,
      phonenumber: registerDto.phonenumber,
      email: registerDto.email,
      userSalt: salt,
      password: await this.hashPassword(registerDto.password, salt),
      role: UserRole.USER,
    };
    this.userRepository.createUser(user);
    return user;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new HttpException('Invalid data', 400);
    }
    const hashPassword = await this.hashPassword(password, user.userSalt);
    //(hashPassword === user.password)

    if (!(hashPassword === user.password)) {
      throw new HttpException('Invalid data', 400);
    }
    const payload = {
      sub: user.id,
      role: user.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  private hashPassword(password: string, salt: string) {
    return hash(password, salt);
  }
}
