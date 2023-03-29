import { Controller, Get } from '@nestjs/common';
import { RatesService } from './rates.service';

@Controller()
export class RatesController {
  constructor(private readonly ratesService: RatesService) {}

  @Get('/rates_ascending')
  getAscendingRates(): Promise<any> {
    return this.ratesService.getAscendingRates();
  }

}
