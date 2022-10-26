import { IsNotEmpty } from "class-validator";
import { Post } from "../../post/entities/post.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'tb_themes' })
export class Theme {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    description: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Post, (post) => post.theme)
    post: Post[]
}