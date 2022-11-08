import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { IResponseJwtStrategy } from "src/interfaces/IResponseJwtStrategy";
import { IPayload } from "../../interfaces/IPayload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_KEY
        });
    }

    async validate(payload: IPayload): Promise<IResponseJwtStrategy> {
        return { id: payload.sub, email: payload.email }
    }
}   
