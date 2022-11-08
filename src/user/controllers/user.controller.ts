import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger/dist";
import { Request } from "express";
import { IResponseJwtStrategy } from "src/interfaces/IResponseJwtStrategy";

import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { User } from "../entities/user.entity";
import { UserService } from "../services/user.service";

@ApiTags('User')
@Controller('/user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Get()
    @ApiBearerAuth()
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
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    callUpdate(@Req() req: Request): Promise<User> {
        return this.userService.update(req.body, req.user as IResponseJwtStrategy)
    }
}