import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { PrismaService } from '../src/prisma/prisma.service';
import { LoginDto } from '../src/auth/dto/login.dto';

describe('App end to end test', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = appModule.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    await app.listen(3012);
    prismaService = app.get<PrismaService>(PrismaService);
    await prismaService.cleanDatabase();

    pactum.request.setBaseUrl('http://localhost:3012');
  });

  afterAll(async () => {
    app.close();
  });

  it.todo('should be defined');

  describe('Auth Controller', () => {
    const dto: LoginDto = {
      email: 'foo@baz.com',
      password: 'foobaz',
    };

    describe('Signup', () => {
      it('should throw if body not provided', () => {
        return pactum.spec().post('/auth/register').expectStatus(400);
      });
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({ password: dto.password })
          .expectStatus(400)
          .expectBodyContains('Email is not provided');
      });
      it('should throw if email not valid', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({ email: 'foobaz.com', password: '123456' })
          .expectStatus(400)
          .expectBodyContains('Email is not valid');
      });
      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({ ...dto, name: 'foo' })
          .expectStatus(201);
      });
      it('should throw if email already taken', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody(dto)
          .expectStatus(400);
      });
    });

    describe('Login', () => {
      it('should throw if body not provided', () => {
        return pactum.spec().post('/auth/login').expectStatus(400);
      });
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({ password: dto.password })
          .expectStatus(400)
          .expectBodyContains('Email is not provided');
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({ email: dto.email })
          .expectStatus(400)
          .expectBodyContains('Password is not provided');
      });
      it('should throw if email not valid', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({ email: 'foobaz.com', password: dto.password })
          .expectStatus(400)
          .expectBodyContains('Email is not valid');
      });
      it('should throw if wrong email', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({ email: 'abc@mail.com', password: dto.password })
          .expectStatus(403)
          .expectBodyContains('User not found');
      });
      it('should throw if wrong password', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({ email: dto.email, password: 'foobazzzz' })
          .expectStatus(403)
          .expectBodyContains('Wrong password');
      });
      it('should login', async () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody(dto)
          .expectStatus(201)
          .stores('accessToken', 'token');
      });
    });
  });
});
