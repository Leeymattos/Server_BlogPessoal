import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemModule } from './postagem/entities/postagem.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_blogpessoal',
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: true
    }),
    PostagemModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
