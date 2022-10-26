import { Injectable } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common/exceptions";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { TrafficableUser } from "../../interfaces/ITrafficableUser";
import { AuthService } from "../services/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService
    ) {
        super({
            usernameField: 'email',
            passwordField: 'password'
        });
    }

    async validate(email: string, password: string): Promise<TrafficableUser> {

        const user = await this.authService.validateUser(email, password)

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}