import { Module } from "@nestjs/common";
import { Bcrypt } from "./bcrypt/auth.service";

@Module({
    imports: [],
    controllers: [],
    providers: [Bcrypt],
    exports: [Bcrypt]
})
export class AuthModule { }