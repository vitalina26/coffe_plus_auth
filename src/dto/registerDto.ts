import { IsNotEmpty,IsString,Length } from "class-validator";
import { IsEmail } from "class-validator/types/decorator/decorators";

export class RegisterDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(8)
    password: string;

    @IsNotEmpty()
    @IsString()
    @Length(8)
    passwoedConfirm: string;
}
