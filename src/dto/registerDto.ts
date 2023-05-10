import {
  IsNotEmpty,
  IsString,
  Length,
  IsEmail,
  MinLength,
} from 'class-validator';
import { UserRole } from 'src/entity/user';

export class RegisterDto {
  @IsNotEmpty()
  @MinLength(3)
  secondname: string;

  @IsNotEmpty()
  @MinLength(3)
  firstname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  phonenumber: string;

  @IsNotEmpty()
  role: UserRole;
}
