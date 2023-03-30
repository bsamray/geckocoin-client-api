import { firstValueFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { RatesResponse } from './dto/rate.dto';

@Injectable()
export class RatesService {
  constructor(private readonly httpService: HttpService) {}

  getAscendingRates(): Promise<RatesResponse> {
    return this.getRates();
  }

  getDescendingRates(): Promise<RatesResponse> {
      return this.getRates();
  }

  private async getRates(): Promise<RatesResponse> {
    // TODO Read from config
    const url = 'https://api.coingecko.com/api/v3/exchange_rates';
    const { data } = await firstValueFrom(this.httpService.get(url));
    return data as RatesResponse;
  }
}
