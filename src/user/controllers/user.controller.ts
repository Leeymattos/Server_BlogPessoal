import { Controller, Get, HttpCode, HttpStatus, Post, Put } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { UserService } from "../services/user.service";

@Controller('/user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    callFindAll(): Promise<User[]> {
        return this.userService.findAll()
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    callCreate(user: User): Promise<User> {
        return this.userService.create(user);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    callUpdate(user: User): Promise<User> {
        return this.userService.update(user);
    }
}