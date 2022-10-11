import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tema } from "src/tema/entities/tema.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class TemaService {

    constructor(
        @InjectRepository(Tema)
        private temaRepository: Repository<Tema>
    ) { }

    async create(tema: Tema): Promise<Tema> {
        return await this.temaRepository.save(tema);
    }

    async findAll(): Promise<Tema[]> {
        return this.temaRepository.find({
            relations: {
                postagem: true
            }
        });
    }

    async findById(id: number): Promise<Tema> {

        let tema = await this.temaRepository.findOne({
            where: {
                id
            },
            relations: {
                postagem: true
            }
        });

        if (!tema) {
            throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);
        }

        return tema;
    }

    async findByDescricao(descricao: string): Promise<Tema[]> {

        let tema = await this.temaRepository.find({
            where: {
                descricao: ILike(`%${descricao}%`)
            },
            relations: {
                postagem: true
            }
        });

        return tema;
    }

    async update(tema: Tema): Promise<Tema> {
        let buscaTema = await this.findById(tema.id);

        if (!buscaTema || !tema.id) {
            throw new HttpException('O tema não foi encontrado!', HttpStatus.NOT_FOUND);
        }

        return await this.temaRepository.save(tema);
    }

    async delete(id: number): Promise<DeleteResult> {

        let buscaTema = await this.findById(id);

        if (!buscaTema) {
            throw new HttpException('', HttpStatus.NOT_FOUND);
        }

        return this.temaRepository.delete(id);
    }

}