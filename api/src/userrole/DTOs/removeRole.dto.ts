import { IsString } from 'class-validator';

export class RemoveRoleDto {
    @IsString()
    userId: string;

    @IsString()
    roleId: string;
}
