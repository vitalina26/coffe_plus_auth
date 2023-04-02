import { IsNotEmpty,IsString,Length,IsEmail, MinLength } from "class-validator";


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
    @Length(8)
    password: string;

    @IsNotEmpty()
    phonenumber: string;

}
