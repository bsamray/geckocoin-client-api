import { AxiosResponse } from 'axios';
import { HttpModule, HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { RatesService } from './rates.service';
import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { ExchangeRatesDto, RatesResponse } from './dto/rate.dto';

describe('RatesService', () => {
  let service: RatesService;
  let httpService: HttpService;
  const apiResponsePayload: RatesResponse = {
    rates: {
      btc: {
        name: 'Bitcoin',
        unit: 'BTC',
        value: 15.743,
        type: 'crypto',
      },
    },
  };
  const AXIOS_INSTANCE_TOKEN = 'AXIOS_INSTANCE_TOKEN';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        RatesService,
        {
          provide: AXIOS_INSTANCE_TOKEN,
          useValue: axios.create(),
        },
      ],
    }).compile();

    httpService = module.get<HttpService>(HttpService);
    service = module.get<RatesService>(RatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('fetch ascending exchange rates from API', () => {
    it('should call API with the correct input and get ascending order', async () => {
      const axiosResponse: AxiosResponse = {
        data: apiResponsePayload,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: undefined,
      };
      const expectedOutcome: ExchangeRatesDto = [
        {
          name: 'Bitcoin',
          unit: 'BTC',
          value: 15.743,
          type: 'crypto',
        },
      ];
      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(axiosResponse));

      const result = await service.getAscendingRates();

      expect(httpService.get).toHaveBeenCalledTimes(1);
      expect(httpService.get).toHaveBeenCalledWith(
        'https://api.coingecko.com/api/v3/exchange_rates',
      );
      expect(result).toMatchObject(expectedOutcome);
    });
  });

  describe('fetch descending exchange rates from API', () => {
    it('should call API with the correct input and get descending order', async () => {
      const axiosResponse: AxiosResponse = {
        data: apiResponsePayload,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: undefined,
      };
      const expectedOutcome: ExchangeRatesDto = [
        {
          name: 'Bitcoin',
          unit: 'BTC',
          value: 15.743,
          type: 'crypto',
        },
      ];
      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(axiosResponse));

      const result = await service.getDescendingRates();

      expect(httpService.get).toHaveBeenCalledTimes(1);
      expect(httpService.get).toHaveBeenCalledWith(
        'https://api.coingecko.com/api/v3/exchange_rates',
      );
      expect(result).toMatchObject(expectedOutcome);
    });
  });
});
