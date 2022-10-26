import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TrafficableUser } from "../../interfaces/ITrafficableUser";
import { UserService } from "../../user/services/user.service";
import { Bcrypt } from "../bcrypt/auth.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private bcrypt: Bcrypt,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<TrafficableUser | null> {

        const userFound = await this.userService.findByEmail(email);

        if (!userFound) {
            return null;
        }

        const isPasswordValid = this.bcrypt.comparePassword(password, userFound.password);

        if (userFound && isPasswordValid) {
            const { password, ...result } = userFound
            return result;
        }
        return null;
    }

    async login(user: TrafficableUser) {
        const payload = {
            sub: user.id,
            email: user.email
        }

        return {
            user: user.email,
            token: `Bearer ${this.jwtService.sign(payload)}`
        }
    }
}