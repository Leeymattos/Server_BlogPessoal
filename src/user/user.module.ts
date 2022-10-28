import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Bcrypt } from "../auth/bcrypt/bcrypt";
import { UserController } from "./controllers/user.controller";
import { User } from "./entities/user.entity";
import { UserService } from "./services/user.service";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService, Bcrypt],
    exports: [TypeOrmModule]
})
export class UserModule { }
