import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { RatesMappingUtil } from './util/rates.mapping.util';
import { ExchangeRatesDto, RatesResponse } from './dto/rate.dto';

@Injectable()
export class RatesService {
  private readonly RATES_URL =
    'https://api.coingecko.com/api/v3/exchange_rates';

  constructor(private readonly httpService: HttpService) {}

  async getAscendingRates(): Promise<ExchangeRatesDto> {
    const currencyRates: RatesResponse = await this.getRates();
    const exchangeRatesDto: ExchangeRatesDto =
      RatesMappingUtil.mapRatesResponseToClientDtoAscending(currencyRates);
    return Promise.resolve(exchangeRatesDto);
  }

  async getDescendingRates(): Promise<ExchangeRatesDto> {
    const currencyRates: RatesResponse = await this.getRates();
    const exchangeRatesDto: ExchangeRatesDto =
      RatesMappingUtil.mapRatesResponseToClientDtoDescending(currencyRates);
    return Promise.resolve(exchangeRatesDto);
  }

  private async getRates(): Promise<RatesResponse> {
    // TODO Read from config
    const url = this.RATES_URL;
    const { data } = await firstValueFrom(this.httpService.get(url));
    return data as RatesResponse;
  }
}
