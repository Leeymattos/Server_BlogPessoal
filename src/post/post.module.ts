import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostContoller } from "../post/controllers/post.controller";
import { PostService } from "../post/services/post.service";
import { ThemeService } from "../theme/services/theme.service";
import { ThemeModule } from "../theme/theme.module";
import { Post } from "./entities/post.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Post]), ThemeModule],
    providers: [PostService, ThemeService],
    controllers: [PostContoller],
    exports: [TypeOrmModule]
})
export class PostModule { }