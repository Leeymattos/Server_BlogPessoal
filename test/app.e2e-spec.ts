import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';


describe('AppController (e2e)', () => {

  let token: string
  let userId: string
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          username: 'root',
          password: 'root',
          database: 'db_blogpessoal_test',
          autoLoadEntities: true,
          synchronize: true,
          logging: false,
          dropSchema: true
        }),
        AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  })

  it('01 - Should register a user', async () => {
    const response = await request(app.getHttpServer())
      .post('/user')
      .send({
        name: 'root',
        email: 'root@root.com',
        password: 'rootroot',
        photo: '    '
      });

    expect(201);

    userId = response.body.id
  });

  it('02 - Must authenticate user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'root@root.com',
        password: 'rootroot'
      });

    expect(200);
    token = response.body.token
  });

  it('03 - Must not duplicate user', async () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({
        name: 'root',
        email: 'root@root.com',
        password: 'rootroot',
        photo: '    '
      })
      .expect(400);
  });

  it('04 - Must list all users', async () => {
    return request(app.getHttpServer())
      .get('/user')
      .set('Authorization', `${token}`)
      .send({})
      .expect(200)
  });

  it('05 - Must update a user', async () => {
    return request(app.getHttpServer())
      .put('/user')
      .set('Authorization', `${token}`)
      .send({
        id: userId,
        name: 'root atualizado',
        email: 'root@root.com',
        password: 'rootroot',
        photo: '    '
      }).expect(200)
      .then(response => {
        expect('root atualizado').toEqual(response.body.name)
      });
  });
});
