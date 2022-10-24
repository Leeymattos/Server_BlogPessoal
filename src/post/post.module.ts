import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostContoller } from "src/post/controllers/post.controller";
import { PostService } from "src/post/services/post.service";
import { ThemeService } from "src/theme/services/theme.service";
import { ThemeModule } from "src/theme/theme.module";
import { Post } from "./entities/post.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Post]), ThemeModule],
    providers: [PostService, ThemeService],
    controllers: [PostContoller],
    exports: [TypeOrmModule]
})
export class PostModule { }