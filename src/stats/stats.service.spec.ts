import axios from 'axios';
import { AxiosResponse } from 'axios';
import { HttpModule, HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { StatsService } from './stats.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CoinDayStats, CoinStatsDto } from './dto/stats.dto';
import { coinDay1Stats } from './util/sample';
import * as moment from 'moment';

describe('StatsService', () => {
  let service: StatsService;
  let httpService: HttpService;
  const apiResponsePayload: CoinDayStats = coinDay1Stats;
  const AXIOS_INSTANCE_TOKEN = 'AXIOS_INSTANCE_TOKEN';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        StatsService,
        {
          provide: AXIOS_INSTANCE_TOKEN,
          useValue: axios.create(),
        },
      ],
    }).compile();

    httpService = module.get<HttpService>(HttpService);
    service = module.get<StatsService>(StatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('fetch historical coin stats from API', () => {
    it('should call API with the correct input and get an array of daily stats', async () => {
      const axiosResponse: AxiosResponse = {
        data: apiResponsePayload,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: undefined,
      };
      const expectedOutcome: CoinStatsDto = {
        id: 'aichain',
        symbol: 'ait',
        name: 'AICHAIN',
        market_price: {
          gbp: {
            low: 0.02,
            high: 0.02,
            average: 0.020000000000000007,
          },
        },
        market_cap: {
          gbp: {
            low: 1000.568,
            high: 1000.568,
            average: 1000.5679999999995,
          },
        },
      };
      jest.spyOn(httpService, 'get').mockReturnValue(of(axiosResponse));

      const result: CoinStatsDto = await service.getHistoricalStats(
        'test_coin',
      );

      expect(httpService.get).toHaveBeenCalledTimes(30);
      Array.from({ length: 30 }, (_, i) => i + 1).forEach((num) => {
        const statDate: string = moment()
          .subtract(num, 'days')
          .format('DD-MM-yyyy');
        expect(httpService.get).toHaveBeenCalledWith(
          `https://api.coingecko.com/api/v3/coins/test_coin/history?date=${statDate}`,
        );
        expect(result).toStrictEqual(expectedOutcome);
      });
    });
  });
});
