import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "src/post/entities/post.entity";
import { ThemeService } from "src/theme/services/theme.service";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class PostService {

    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
        private themeService: ThemeService
    ) { }

    async create(post: Post): Promise<Post> {

        if (post.theme) {
            const theme = await this.themeService.findById(post.theme.id);

            if (!theme) {
                throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);
            }
        }

        return await this.postRepository.save(post);
    }

    async findAll(): Promise<Post[]> {
        return await this.postRepository.find({
            relations: {
                theme: true,
                user: true
            }
        });
    }

    async findById(id: string): Promise<Post> {
        let postFound = await this.postRepository.findOne({
            where: {
                id
            },
            relations: {
                theme: true,
                user: true
            }
        });

        if (!postFound) {
            throw new HttpException('Post não foi encontrado!', HttpStatus.NOT_FOUND)
        }

        return postFound;
    }

    async findByTittle(title: string): Promise<Post[]> {
        return this.postRepository.find({
            where: {
                title: ILike(`%${title}%`)
            },
            relations: {
                theme: true,
                user: true
            }
        });
    }

    async update(post: Post): Promise<Post> {
        let postFound: Post = await this.findById(post.id);

        if (!postFound || !post.id) {
            throw new HttpException('Post não encontrado!', HttpStatus.NOT_FOUND);
        }

        if (post.theme) {
            const theme = await this.themeService.findById(post.theme.id);

            if (!theme) {
                throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);
            }

            return await this.postRepository.save(post);
        }
    }

    async delete(id: string): Promise<DeleteResult> {
        const postFound = await this.findById(id);

        if (!postFound) {
            throw new HttpException('Post não encontrado!', HttpStatus.NOT_FOUND);
        }

        return await this.postRepository.delete(id);
    }

}
