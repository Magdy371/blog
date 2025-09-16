import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;

    @IsOptional()
    @IsString()
    name?: string;

    // Optional: Assign roles on creation
    @IsOptional()
    @IsString({ each: true })
    roleIds?: string[];
}
