import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { UserController } from "./controllers/user.controller";
import { User } from "./entities/user.entity";
import { UserService } from "./services/user.service";

@Module({
    imports: [TypeOrmModule.forFeature([User]), AuthModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [TypeOrmModule]
})
export class UserModule { }
