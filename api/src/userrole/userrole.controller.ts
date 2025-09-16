import { Controller, Post, Delete, Body } from '@nestjs/common';
import { UserRoleService } from './userrole.service';
import { AssignRoleDto } from './DTOs/assignRole.dto';
import { RemoveRoleDto } from './DTOs/removeRole.dto';

@Controller('userroles')
export class UserRoleController {
    constructor(private readonly userRoleService: UserRoleService) {}

    @Post()
    assignRole(@Body() dto: AssignRoleDto) {
        return this.userRoleService.assignRole(dto);
    }

    @Delete()
    removeRole(@Body() dto: RemoveRoleDto) {
        return this.userRoleService.removeRole(dto);
    }
}
