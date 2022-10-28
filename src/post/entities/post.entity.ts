import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import { Theme } from '../../theme/entities/theme.entity'
import { User } from '../../user/entities/user.entity'

@Entity({ name: 'tb_posts' })
export class Post {

    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id: string

    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    @ApiProperty()
    title: string

    @IsNotEmpty()
    @Column({ length: 1000, nullable: false })
    @ApiProperty()
    text: string

    @CreateDateColumn()
    @ApiProperty()
    createdAt: Date

    @UpdateDateColumn()
    @ApiProperty()
    updatedAt: Date

    @ApiProperty({ type: () => Theme })
    @ManyToOne(() => Theme, (theme) => theme.post, {
        onDelete: "CASCADE"
    })
    theme: Theme

    @ApiProperty({ type: () => User })
    @ManyToOne(() => User, user => user.post, {
        onDelete: "CASCADE"
    })
    user: User

}