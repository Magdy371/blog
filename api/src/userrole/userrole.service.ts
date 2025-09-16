import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AssignRoleDto } from './DTOs/assignRole.dto';
import { RemoveRoleDto } from './DTOs/removeRole.dto';

@Injectable()
export class userRoleService {
    constructor (private prisma: PrismaService) {}
    async assignRole(assignRoleDto: AssignRoleDto) {
        const user = await this.prisma.user.findUnique({ where: { id: dto.userId } });
        if (!user){
            throw new NotFoundException('User not found');
        }
        const role = await this.prisma.role.findUnique({ where: { id: dto.roleId } });
        if (!role){
            throw new NotFoundException('Role not found');
        }
        return this.prisma.userRole.create({
            data: {
                userId: dto.userId,
                roleId: dto.roleId,
            },
        });
    }
    async removeUserRole(removeRoleDto: RemoveRoleDto) {
        const existing = await this.prisma.userRole.findUnique({
            where: {
                userId_roleId: {
                    userId: dto.userId,
                    roleId: dto.roleId,
                },
            },
        });
        if (!existing) {
            throw new NotFoundException(`Role ${dto.roleId} not assigned to user ${dto.userId}`);
        }

        await this.prisma.userRole.delete({
            where: {
                userId_roleId: {
                    userId: dto.userId,
                    roleId: dto.roleId,
                },
            },
        });
        return { message: `Role ${dto.roleId} removed from user ${dto.userId}` };
    }
}