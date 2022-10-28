import { IsNotEmpty } from "class-validator";

import { Post } from "../../post/entities/post.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'tb_themes' })
export class Theme {

    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id: string

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty()
    description: string

    @CreateDateColumn()
    @ApiProperty()
    createdAt: Date

    @UpdateDateColumn()
    @ApiProperty()
    updatedAt: Date

    @OneToMany(() => Post, (post) => post.theme)
    @ApiProperty()
    post: Post[]
}