import { IsString, Length, IsEmail, MinLength } from 'class-validator';

export class UserUpdateDto {
  @MinLength(3)
  secondname?: string;

  @MinLength(3)
  firstname?: string;

  @IsEmail()
  email?: string;

  @IsString()
  @Length(8)
  password?: string;

  phonenumber?: string;
}
