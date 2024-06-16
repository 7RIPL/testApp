import { IsEmail, MinLength } from "class-validator";

export class CreateUserDto {
    @MinLength(2)
    readonly name: string;

    @IsEmail()
    readonly email: string;
}
