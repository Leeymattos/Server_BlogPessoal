import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IResponseJwtStrategy } from "src/interfaces/IResponseJwtStrategy";
import { Repository } from "typeorm";

import { Bcrypt } from "../../auth/bcrypt/bcrypt";
import { User } from "../entities/user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private bcrypt: Bcrypt
    ) { }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find({
            relations: {
                post: true
            }
        });
    }

    async findById(id: string): Promise<User> {
        const userFound = await this.userRepository.findOne({
            where: {
                id
            },
            relations: {
                post: true
            }
        });

        if (!userFound) {
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
        }

        return userFound
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return await this.userRepository.findOne({
            where: {
                email
            },
            relations: {
                post: true
            }
        });
    }

    async create(user: User): Promise<User> {
        const userFound = await this.findByEmail(user.email);

        if (!userFound) {
            if (user.id) {
                delete (user.id);
            }
            user.password = await this.bcrypt.hashPassword(user.password);
            return await this.userRepository.save(user);
        }

        throw new HttpException('O email já existe!', HttpStatus.BAD_REQUEST);
    }

    async update(user: User, userValidate: IResponseJwtStrategy): Promise<User> {

        user.id = userValidate.id

        await this.findById(user.id);
        const userFound = await this.findByEmail(user.email);

        if (userFound && userFound.id !== user.id) {
            throw new HttpException('O email já existe!', HttpStatus.BAD_REQUEST);
        }

        user.password = await this.bcrypt.hashPassword(user.password);
        return await this.userRepository.save(user)
    }
}