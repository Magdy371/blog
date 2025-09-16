import { Injectable, UnauthorizedException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
Injectable()
export class AuthService {
    constructor(private  readonly prisma: PrismaService, private readonly jwtService: JwtService) {}
    async validateUser(email: string, pass :string){
        const user = await this.prisma.user.findUnique({
            where:{email},
            include: {userRoles: {include:{role:true}}}
        });
        if(!user){
            throw  new NotFoundException(`User with email ${email} not found`);
        }
        const isValid = await bcrypt.compare(pass, user.password);
        if(!isValid) throw new UnauthorizedException('Invalid credentials')

        return user;
    }

    async login(user: any){
        const payload = {
            sub:user.id,
            email: user.email,
            role: user.userRoles.map(u=>u.role.name)
        };
        return {access_token: this.jwtService.sign(payload)}
    }
}