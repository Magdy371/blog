import { IsString, IsOptional, Length } from 'class-validator';

export class createRoleDto {
    @IsString()
    @Length(3, 50)
    name: string;

    @IsOptional()
    @IsString()
    @Length(0, 450)
    description?: string;
}