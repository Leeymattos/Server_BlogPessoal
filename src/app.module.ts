import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';

import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { ThemeModule } from './theme/theme.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: true
    }),
    PostModule,
    ThemeModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
