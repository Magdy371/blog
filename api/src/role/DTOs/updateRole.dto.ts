import {  IsString, IsOptional } from 'class-validator';

export class updateRoleDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;
}