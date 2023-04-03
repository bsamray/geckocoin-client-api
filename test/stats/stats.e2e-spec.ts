import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { StatsModule } from '../../src/stats/stats.module';

describe('StatsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [StatsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/coin_stats/:id (GET)', () => {
    return request(app.getHttpServer()).get('/coin_stats/test').expect(200);
  });
});
