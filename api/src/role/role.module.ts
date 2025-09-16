import { Module } from '@nestjs/common';
import { roleService } from './role.service';
import { roleController } from './role.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    controllers: [roleController],
    providers: [roleService, PrismaService],
    exports: [roleService]
})
export class roleModule {}