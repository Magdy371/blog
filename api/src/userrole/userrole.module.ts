import { Module } from '@nestjs/common';
import { UserRoleService } from './userrole.service';
import { UserRoleController } from './userrole.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    controllers: [UserRoleController],
    providers: [UserRoleService, PrismaService],
})
export class UserRoleModule {}
