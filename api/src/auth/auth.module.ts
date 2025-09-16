import { Module } from '@nestjs/common';
import { jwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports:[
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'Arh0u926@#$',
            signOptions: { expiresIn: '1d' }, // 1 day expiry
        }),
    ],
    providers: [AuthService, PrismaService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}