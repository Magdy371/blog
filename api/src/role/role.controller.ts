import { roleService } from './role.service'
import { Body, Param, Post, Put, Get, Delete, Controller } from '@nestjs/common';
import { createRoleDto } from './DTOs/createRole.dto';
import { updateRoleDto } from './DTOs/updateRole.dto';

@Controller('roles')
export class roleController {
    constructor( private readonly roleService: roleService ) {}

    @Post()
    async create(@Body() data: createRoleDto) {
        return this.roleService.create(data);
    }

    @Get()
    async findAll(){
        return this.roleService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string){
        return this.roleService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: updateRoleDto){
        return this.roleService.update(id, data);
    }
    @Delete(':id')
    async remove(@Param('id') id: string){
        return this.roleService.romove(id);
    }
}