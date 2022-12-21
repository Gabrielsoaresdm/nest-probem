import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';


describe('Teste de Modulos Usuario e Auth (e2e)', () => {
  let token: any;
  let usuarioId: any;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'db_blogpessoal_teste2',
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

  afterAll(async ()  => {
    await app.close()
  })

  it('01 - Deve Cadastrar Usuario', async () => {
    const resposta = await request(app.getHttpServer())
    .post('/usuario/cadastrar')
    .send({
      nome: 'jorginho',
      usuario: 'jorginho@root.com',
      senha: 'rootroot',
      foto: ''
    });
    expect(201)
    usuarioId = resposta.body.id
  })

  it('02 - Deve Autenticar Usuario Login', async () => {
    const resposta = await request(app.getHttpServer())
    .post('/auth/logar')
    .send({
      usuario: 'jorginho@root.com',
      senha: 'rootroot'
    })
    expect(200)

    token = resposta.body.token
    

  })

  it('03 - Não deve duplicar o usuario', async () => {
    return request (app.getHttpServer())
    .post('/usuario/cadastrar')
    .send({
      nome: 'jorginho',
      usuario: 'jorginho@root.com',
      senha: 'rootroot',
      foto: ''
    })
    .expect(400)

  })

  it('04 - Deve listar todos os usuarios', async () => {
    return request (app.getHttpServer())
    .get('/usuario/all')
    .set('Authorization', `${token}`)
    .send({})
    .expect(200)
  })

  it('05 - Deve atualizar um usuario', async () => {
    return request (app.getHttpServer())
    .put('/usuario/atualizar')
    .set('Authorization', `${token}`)
    .send({
      id: usuarioId,
      nome: 'root',
      usuario: 'root@gmail.com',
      senha: 'rootroot',
      foto: ''
    })
    .expect(200)
    .then(resposta => {
      expect("root").toEqual(resposta.body.nome)
    })
  })

});
