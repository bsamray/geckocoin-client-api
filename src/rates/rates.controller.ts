import { ApiOperation } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { ExchangeRatesDto } from './dto/rate.dto';
import { RatesService } from './rates.service';

@Controller()
export class RatesController {
  constructor(private readonly ratesService: RatesService) {}

  @ApiOperation({ summary: 'Get exchange rates in ascending order' })
  @Get('/rates_ascending')
  getAscendingRates(): Promise<ExchangeRatesDto> {
    return this.ratesService.getAscendingRates();
  }

  @ApiOperation({ summary: 'Get exchange rates in ascending order' })
  @Get('/rates_descending')
  getDescendingRates(): Promise<ExchangeRatesDto> {
    return this.ratesService.getDescendingRates();
  }
}
