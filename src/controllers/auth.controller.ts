import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/registerDto';
import { LoginDto } from '../dto/loginDto';
import { RefreshTokenDto } from 'src/dto/refresh-token';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(@Body() registerDto: RegisterDto) {
    return this.authService.createUser(registerDto);
  }
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    
  }
  @Post('/refresh-token')
  async refreshToken(@Body() refreshToken: RefreshTokenDto) {
   
  }
  
  


}
