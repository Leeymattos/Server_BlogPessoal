import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { IsNotEmpty } from "class-validator"
import { Post } from "../../post/entities/post.entity"
import { ApiProperty } from "@nestjs/swagger"

@Entity('tb_users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id: string

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty()
    name: string

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty()
    email: string

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty()
    password: string

    @IsNotEmpty()
    @Column({ length: 5000, nullable: false })
    @ApiProperty()
    photo: string

    @CreateDateColumn()
    @ApiProperty()
    createdAt: Date

    @UpdateDateColumn()
    @ApiProperty()
    updatedAt: Date

    @OneToMany(() => Post, post => post.user)
    @ApiProperty()
    post: Post[]
}