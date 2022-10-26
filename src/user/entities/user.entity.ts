import { IsNotEmpty } from "class-validator"
import { Post } from "../../post/entities/post.entity"
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('tb_users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    name: string

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    email: string

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    password: string

    @IsNotEmpty()
    @Column({ length: 5000, nullable: false })
    photo: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Post, post => post.user)
    post: Post[]
}