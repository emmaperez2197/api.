import { IsEmail, IsNotEmpty, Matches } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty({message: 'Enter an email please'})
    @IsEmail({},{message: 'You must enter a valid email'})
    email: string;

    @IsNotEmpty({message: 'You must add the password'})
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*$/, { message: 'The password must contain at least one letter and one number' })
    password: string
}
