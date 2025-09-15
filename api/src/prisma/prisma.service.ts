import {Injectable, OnModuleInit, OnModuleDestroy} from '@nestjs/common';
import {PrismaClient} from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy{
    async OnModuleInit(){
        await this.$connect();
    }
    async OnModuleDestroy(){
        await this.$disconnect();
    }

    onModuleDestroy(): any {
    }

    onModuleInit(): any {
    }
}