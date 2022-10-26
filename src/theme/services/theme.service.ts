import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Theme } from "../../theme/entities/theme.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class ThemeService {

    constructor(
        @InjectRepository(Theme)
        private themeRepository: Repository<Theme>
    ) { }

    async create(theme: Theme): Promise<Theme> {
        return await this.themeRepository.save(theme);
    }

    async findAll(): Promise<Theme[]> {
        return this.themeRepository.find({
            relations: {
                post: true
            }
        });
    }

    async findById(id: string): Promise<Theme> {

        let theme = await this.themeRepository.findOne({
            where: {
                id
            },
            relations: {
                post: true
            }
        });

        if (!theme) {
            throw new HttpException('Theme não encontrado!', HttpStatus.NOT_FOUND);
        }

        return theme;
    }

    async findByDescription(description: string): Promise<Theme[]> {

        let theme = await this.themeRepository.find({
            where: {
                description: ILike(`%${description}%`)
            },
            relations: {
                post: true
            }
        });

        return theme;
    }

    async update(theme: Theme): Promise<Theme> {
        let themeFound = await this.findById(theme.id);

        if (!themeFound || !theme.id) {
            throw new HttpException('O theme não foi encontrado!', HttpStatus.NOT_FOUND);
        }

        return await this.themeRepository.save(theme);
    }

    async delete(id: string): Promise<DeleteResult> {

        let themeFound = await this.findById(id);

        if (!themeFound) {
            throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);
        }

        return this.themeRepository.delete(id);
    }

}