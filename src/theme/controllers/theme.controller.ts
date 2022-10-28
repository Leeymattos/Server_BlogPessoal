import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger/dist";
import { DeleteResult } from "typeorm";

import { Theme } from "../entities/theme.entity";
import { ThemeService } from "../services/theme.service";

@ApiTags('Theme')
@Controller('tb_themes')
@ApiBearerAuth()
export class ThemeController {

    constructor(
        private readonly ThemeService: ThemeService
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    callCreate(@Body() theme: Theme): Promise<Theme> {
        return this.ThemeService.create(theme)
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    callFindAll() {
        return this.ThemeService.findAll()
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    callFindById(@Param('id', ParseUUIDPipe) id: string): Promise<Theme> {
        return this.ThemeService.findById(id);
    }

    @Get('/description/:description')
    @HttpCode(HttpStatus.OK)
    callFindByDescription(@Param('description') description: string): Promise<Theme[]> {
        return this.ThemeService.findByDescription(description);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    callUpdate(@Body() theme: Theme): Promise<Theme> {
        return this.ThemeService.update(theme);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    callDelete(@Param('id', ParseUUIDPipe) id: string): Promise<DeleteResult> {
        return this.ThemeService.delete(id);
    }
}