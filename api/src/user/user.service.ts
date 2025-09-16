import {Controller, Get, Post, Body, Param, Delete, Put, Injectable} from '@nestjs/common';
import { CreateUserDto } from './DTOs/createUser.dto';
import { UpdateUserDto } from './DTOs/updateUser.dto';
import { User } from '@prisma/client';
import { PrismaService} from "../prisma/prisma.service";

@Injectable()
export class UserService{
    constructor(private prisma:PrismaService) {
    }

    private sanitize(user: any) {
        const { password, ...rest } = user;
        return {
            ...rest,
            roles: user.userRoles.map((ur) => ({
                id: ur.role.id,
                name: ur.role.name,
                description: ur.role.description,
            })),
        };
    }


    async create(data:CreateUserDto): Promise<User> {
        const user = await this.prisma.user.create({
           data:{
               email:data.email,
               name:data.name,
               password:data.password,
               userRoles:data.roleIds?{
                   create:data.roleIds.map((roleId) => ({
                       role: { connect: { id: roleId } },
                   })),
               }
               :undefined,
           },
            include: {
                userRoles: { include: { role: true } },
            },
        });
        return this.sanitize(user);
    }
    async findAll() {
        const users = await this.prisma.user.findMany({
            include: { userRoles: { include: { role: true } } },
        });
        return users.map((user) => this.sanitize(user));
    }

    async findOne(id:string): Promise<User | null>{
        const user = await this.prisma.user.findUnique({
            where:{id},
            include: { userRoles: { include: { role: true } } }
        });
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }

        return this.sanitize(user);
    }

    async update(id: string, dto: UpdateUserDto) {
        const foundedUser = await this.prisma.user.findUnique({where:{id}});
        if (!foundedUser) {
            throw new Error('User not found');
        }
        const user = await this.prisma.user.update({
            where: { id },
            data: {
                email: dto.email || foundedUser.email,
                password: dto.password || foundedUser.password,
                name: dto.name || foundedUser.name,
                userRoles: dto.roleIds
                    ? {
                        deleteMany: {}, // clear old roles
                        create: dto.roleIds.map((roleId) => ({
                            role: { connect: { id: roleId } },
                        })),
                    }
                    : undefined,
            },
            include: { userRoles: { include: { role: true } } },
        });

        return this.sanitize(user);
    }
    async remove(id:string){
        await this.prisma.user.delete({where: {id}});
        return { message: `User ${id} deleted` };
    }
}