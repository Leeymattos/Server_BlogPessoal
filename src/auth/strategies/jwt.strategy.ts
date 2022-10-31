import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { Payload } from "../../interfaces/IPayload";


export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'dbaiudnasdbas'
        });
    }

    async validate(payload: Payload) {
        return { id: payload.sub, email: payload.email }
    }
}   
