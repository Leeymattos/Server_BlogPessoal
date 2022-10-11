import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "src/postagem/entities/postagem.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class PostagemService {

    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem> //assíncrona
    ) { }

    async create(postagem: Postagem): Promise<Postagem> {
        return await this.postagemRepository.save(postagem);
    }

    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find();
    }

    async findById(id: number): Promise<Postagem> {
        let buscaPostagem = await this.postagemRepository.findOne({
            where: {
                id
            }
        });

        if (!buscaPostagem) {
            throw new HttpException('Postagem não foi encontrada!', HttpStatus.NOT_FOUND)
        }

        return buscaPostagem;
    }

    async findByTitulo(titulo: string): Promise<Postagem[]> {
        return this.postagemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)
            }
        });
    }

    async update(postagem: Postagem): Promise<Postagem> {
        let buscaPostagem: Postagem = await this.findById(postagem.id);


        if (!buscaPostagem || !postagem.id) {
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);
        }

        return await this.postagemRepository.save(postagem);
    }

    async delete(id: number): Promise<DeleteResult> {
        let buscaPostagem = await this.findById(id);
        if (!buscaPostagem) {
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);
        }

        return await this.postagemRepository.delete(id);
    }



}
