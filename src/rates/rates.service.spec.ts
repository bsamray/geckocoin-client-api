import { AxiosResponse } from 'axios';
import { HttpModule, HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { RatesService } from './rates.service';
import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';

describe('RatesService', () => {
  let service: RatesService;
  let httpService: HttpService;
  const expectedData = { data: 'test-data' };
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

  describe('get fetch exchange rates from API', () => {
    it('should call API with the correct input and get correct data ', async () => {
      const axiosResponse: AxiosResponse = {
        data: expectedData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: undefined,
      };
      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(axiosResponse));

      const result = await service.getAscendingRates();

      expect(httpService.get).toHaveBeenCalledTimes(1);
      expect(httpService.get).toHaveBeenCalledWith(
        'https://api.coingecko.com/api/v3/exchange_rates',
      );
      expect(result).toEqual(expectedData);
    });
  });
});
