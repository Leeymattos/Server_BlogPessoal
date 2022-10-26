import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { User } from "../entities/user.entity";
import { UserService } from "../services/user.service";

@Controller('/user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    callFindAll(): Promise<User[]> {
        return this.userService.findAll()
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    callCreate(@Body() user: User): Promise<User> {
        return this.userService.create(user);
    }

    @Put()
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    callUpdate(@Body() user: User): Promise<User> {
        return this.userService.update(user);
    }
}