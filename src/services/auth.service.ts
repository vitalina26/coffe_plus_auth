import { HttpException, Injectable } from '@nestjs/common';
import { RegisterDto } from '../dto/registerDto';
import { LoginDto } from '../dto/loginDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/entity/user';
import { Repository } from 'typeorm';
import { hash, genSalt,compare } from 'bcrypt';
import { RefreshTokenDto } from 'src/dto/refresh-token';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export interface JWTTokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,

  ) { }




  async createUser(registerDto: RegisterDto) {
    const existingUser = await this.userRepository.findOne({
      where: {email : registerDto.email},
    })
    if (existingUser) {
      throw new HttpException('email already registrated', 400);
    }
    const salt = await genSalt();

    this.userRepository.save({
      email: registerDto.email,
      userSalt : salt,
      password: await this.hashPassword(registerDto.password, salt),
      role: UserRole.USER,
    })
    
  }



  async login(loginDto: LoginDto): Promise<JWTTokens> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('Invalid data', 400);
    }

    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      throw new HttpException('Invalid data', 400);
    }
    return this.getTokens(user);
  }



  async refreshToken(token:RefreshTokenDto): Promise<JWTTokens> {
    try {
      const { sub: email } = await this.jwtService.verifyAsync(token.refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      });
      const user = await this.userRepository.findOneOrFail({
        where: { email },
      });
      return this.getTokens(user);
    } catch (err) {
      throw new HttpException('Invalid credentials', 400);
    }
  }



  private hashPassword(password:string, salt:string) {
    return hash(password, salt)
  }


  private async getTokens(user: User): Promise<JWTTokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: user.email,
          role: user.role,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_EXPIRATION',
          ),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: user.email,
          role: user.role,
        },
        {
          secret: this.configService.get<string>(' JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_REFRESH_TOKEN_EXPIRATION',
          ),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

}