import { IsNotEmpty } from 'class-validator'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import { Theme } from '../../theme/entities/theme.entity'
import { User } from '../../user/entities/user.entity'

@Entity({ name: 'tb_posts' })
export class Post {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    title: string

    @IsNotEmpty()
    @Column({ length: 1000, nullable: false })
    text: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => Theme, (theme) => theme.post, {
        onDelete: "CASCADE"
    })
    theme: Theme

    @ManyToOne(() => User, user => user.post, {
        onDelete: "CASCADE"
    })
    user: User

}