import { Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { TrafficableUser } from "../../interfaces/ITrafficableUser";
import { localAuthGuard } from "../guards/local-auth.guard";
import { AuthService } from "../services/auth.service";

@Controller('/auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @UseGuards(localAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/login')
    async login(@Req() req: TrafficableUser) {
        return this.authService.login(req)
    }
}
