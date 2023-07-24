import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const GRAPHQL_ENDPOINT = '/graphql';
const testUser = {
  email : 'corepen_@naver.com',
  password : '12345'
}

jest.mock('got', () => {
  return {
    post: jest.fn(),
  };
});

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let usersRepository: Repository<User>;
  let jwtToken: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
    await app.init();
  });

  afterAll(async () => {
    const dataSource = new DataSource({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    const connection = await dataSource.initialize();
    await connection.dropDatabase();
    await connection.destroy();
    await app.close();
  });

  describe('createAccount', () => {
    it('should create account', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send({
          query: `
          mutation{
	          createAccount(input:{
            email: "${testUser.email}",
            password : "${testUser.password}",
            role : owner
        })
    {
      ok,
      error
    }
}
          `,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createAccount.ok).toBe(true);
          expect(res.body.data.createAccount.error).toBe(null);
        });
    });

        it('should fail if account already exists', () => {
          return request(app.getHttpServer())
            .post(GRAPHQL_ENDPOINT)
            .send({
              query: `
          mutation {
            createAccount(input: {
              email:"${testUser.email}",
              password:"${testUser.password}",
              role:owner
            }) {
              ok
              error
            }
          }
        `,
            })
            .expect(200)
            .expect((res) => {
              expect(res.body.data.createAccount.ok).toBe(false);
              expect(res.body.data.createAccount.error).toBe(
                'There is a user with that email already',
              );
            });
        });
  });

    describe('login', () => {
      it('should login with correct credentials', () => {
        return request(app.getHttpServer())
          .post(GRAPHQL_ENDPOINT)
          .send({
            query: `
          mutation {
            login(input:{
              email:"${testUser.email}",
              password:"${testUser.password}",
            }) {
              ok
              error
              token
            }
          }
        `,
          })
          .expect(200)
          .expect((res) => {
            const {
              body: {
                data: { login },
              },
            } = res;
            expect(login.ok).toBe(true);
            expect(login.error).toBe(null);
            expect(login.token).toEqual(expect.any(String));
            jwtToken = login.token;
          });
      });
      it('should not be able to login with wrong credentials', () => {
        return request(app.getHttpServer())
          .post(GRAPHQL_ENDPOINT)
          .send({
            query: `
          mutation {
            login(input:{
              email:"${testUser.email}",
              password:"xxx",
            }) {
              ok
              error
              token
            }
          }
        `,
          })
          .expect(200)
          .expect((res) => {
            const {
              body: {
                data: { login },
              },
            } = res;
            expect(login.ok).toBe(false);
            expect(login.error).toBe('Wrong password');
            expect(login.token).toBe(null);
          });
      });
    });

   describe('userProfile', () => {
     let userId: number;
     beforeAll(async () => {// console.log('usersRepository :', await usersRepository.find());
       const [user] = await usersRepository.find();
      //  console.log('[User] :', user.id)
       userId = user.id;
     });

     it("should see a user's profile", () => {
       return request(app.getHttpServer())
         .post(GRAPHQL_ENDPOINT)
         .set('X-JWT', jwtToken)
         .send({
           query : `
        {
          userProfile(userId:${userId}){
            ok
            error
            user {
              id
            }
          }
        }`,
      })
         .expect(200)
         .expect((res) => {
           const {
             body: {
               data: {
                 userProfile: {
                   ok,
                   error,
                   user: { id },
                 },
               },
             },
           } = res;
           expect(ok).toBe(true);
           expect(error).toBe(null);
           expect(id).toBe(userId);
         });
     });

    //  it('should not find a profile', () => {
    //    return request(app.getHttpServer())
    //      .post(GRAPHQL_ENDPOINT)
    //      .set('X-JWT', jwtToken)
    //      .send({
    //        query: `
    //     {
    //       userProfile(userId:666){
    //         ok
    //         error
    //         user {
    //           id
    //         }
    //       }
    //     }
    //     `,
    //      })
    //      .expect(200)
    //      .expect((res) => {
    //        const {
    //          body: {
    //            data: {
    //              userProfile: { ok, error, user },
    //            },
    //          },
    //        } = res;
    //        expect(ok).toBe(false);
    //        expect(error).toBe('User Not Found');
    //        expect(user).toBe(null);
    //      });
    //  });
   });

  it.todo('me');
  it.todo('verifyEmail');
  it.todo('editProfile');
});