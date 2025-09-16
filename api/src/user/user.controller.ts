import { Body, Controller, Param, Get, Post, Put, Delete } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./DTOs/createUser.dto";
import { UpdateUserDto } from "./DTOs/updateUser.dto";
@Controller('users')
export class UserController {
    constructor(private userService:UserService) {}
    @Post()
    async create(@Body() dto:CreateUserDto){
        return this.userService.create(dto);
    }

    @Get()
    async getAll(){
        return this.userService.findAll();
    }

    @Get(':id')
    async getOne(@Param('id') id:string){
        return this.userService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto:UpdateUserDto){
        return this.userService.update(id,dto);
    }
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(id);
    }
}