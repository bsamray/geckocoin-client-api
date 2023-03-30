import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { RateMappingService } from './util/rates.mapping.util';
import { ExchangeRatesDto, RatesResponse } from './dto/rate.dto';

@Injectable()
export class RatesService {
  constructor(private readonly httpService: HttpService) {}

  async getAscendingRates(): Promise<ExchangeRatesDto> {
    const currencyRates = await this.getRates();
    const exchangeRatesDto =
      RateMappingService.mapRatesResponseToClientDtoAscending(currencyRates);
    return Promise.resolve(exchangeRatesDto);
  }

  async getDescendingRates(): Promise<ExchangeRatesDto> {
    const currencyRates = await this.getRates();
    const exchangeRatesDto =
      RateMappingService.mapRatesResponseToClientDtoDescending(currencyRates);
    return Promise.resolve(exchangeRatesDto);
  }

  private async getRates(): Promise<RatesResponse> {
    // TODO Read from config
    const url = 'https://api.coingecko.com/api/v3/exchange_rates';
    const { data } = await firstValueFrom(this.httpService.get(url));
    return data as RatesResponse;
  }
}
