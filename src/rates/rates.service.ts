import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RatesService {
  constructor(private readonly httpService: HttpService) {}

  async getAscendingRates() {
    // TODO Read from config
    const url = 'https://api.coingecko.com/api/v3/exchange_rates';
    const { data } = await firstValueFrom(this.httpService.get(url));
    return data;
  }
}
