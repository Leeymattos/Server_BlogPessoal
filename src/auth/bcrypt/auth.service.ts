import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'

@Injectable()
export class Bcrypt {
    async hashPassword(password: string): Promise<string> {

        const salts = 10
        return await bcrypt.hash(password, salts);
    }

    async comparePassword(password: string, passwordHash: string): Promise<Boolean> {

        return bcrypt.compareSync(password, passwordHash);
    }
}