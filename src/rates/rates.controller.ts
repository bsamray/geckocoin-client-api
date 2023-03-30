import { Controller, Get } from '@nestjs/common';
import { RatesResponse } from './dto/rate.dto';
import { RatesService } from './rates.service';

@Controller()
export class RatesController {
  constructor(private readonly ratesService: RatesService) {}

  // TODO Swagger
  @Get('/rates_ascending')
  getAscendingRates(): Promise<RatesResponse> {
    return this.ratesService.getAscendingRates();
  }
}
