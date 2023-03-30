import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { RatesModule } from '../../src/rates/rates.module';

describe('RatesController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RatesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/rates_ascending (GET)', () => {
    return request(app.getHttpServer()).get('/rates_ascending').expect(200);
  });
});
