import { createRoleDto } from './DTOs/createRole.dto';
import { updateRoleDto } from './DTOs/updateRole.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class roleService {
    constructor(private prisma: PrismaService) {
    }

    async create(data: createRoleDto): Promise<Role> {
        const existingRole = await this.prisma.role.findUnique({
            where : { name: data.name }
        });
        if (existingRole){
            throw new Error(`Role with name ${data.name} already exists`);
        }
        return this.prisma.role.create({
            data: {
                name: data.name,
                description: data.description
            }
        });
    }
    async findAll(): Promise<Role[]> {
        return this.prisma.role.findMany({
            include: {
                userRoles: true
            }
        });
    }

    async findOne(id :string): Promise<Role | null>{
        const role = await this.prisma.role.findUnique({
            where: { id },
            include: {
                userRoles: true
            }
        });
        if (!role) {
            throw new NotFoundException(`Role with ID ${id} not found`);
        }
        return role;
    }

    async update(id:string, data: updateRoleDto){
        const role = await this.prisma.role.findUnique({where: {id}});
        if (!role) {
            throw new NotFoundException(`Role with ID ${id} not found`);
        }
        return this.prisma.role.update({
            where: {id},
            data: {
                name: data.name || role.name,
                description: data.description || role.description
            }
        });
    }
    async romove(id:string): Promise<string>{
        const role = await this.prisma.role.findUnique({where: {id}});
        if(!role){
            throw new NotFoundException(`Role with ID ${id} not found`);
        }
        await this.prisma.role.delete({where: {id}});
        return `Role with ID ${id} has been deleted`;
    }
}