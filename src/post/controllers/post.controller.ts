import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post as methodPost, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger/dist";

import { Post } from "../../post/entities/post.entity";
import { PostService } from "../../post/services/post.service";

@ApiTags('Post')
@Controller('/post')
@ApiBearerAuth()
export class PostContoller {

    constructor(private readonly postService: PostService) { }

    @methodPost()
    @HttpCode(HttpStatus.CREATED)
    callCreate(@Body() post: Post): Promise<Post> {
        return this.postService.create(post);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    callFindAll(): Promise<Post[]> {
        return this.postService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    callFindById(@Param('id', ParseUUIDPipe) id: string): Promise<Post> {
        return this.postService.findById(id);
    }

    @Get('/title/:title')
    @HttpCode(HttpStatus.OK)
    callFindByTitle(@Param('title') title: string): Promise<Post[]> {
        return this.callFindByTitle(title);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    callUpdate(@Body() post: Post): Promise<Post> {
        return this.postService.update(post);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    callDelete(@Param('id', ParseUUIDPipe) id: string) {
        return this.postService.delete(id)
    }
}