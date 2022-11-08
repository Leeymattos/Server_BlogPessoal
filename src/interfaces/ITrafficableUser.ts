import { Post } from "../post/entities/post.entity";

export interface ITrafficableUser {
    id: string;
    name: string;
    email: string;
    photo: string;
    createdAt: Date;
    updatedAt: Date;
    post: Post[];
}