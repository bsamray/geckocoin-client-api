import {
  CurrencyRates,
  RatesResponse,
  ExchangeRatesDto,
} from '../dto/rate.dto';

export class RateMappingService {
  static mapRatesResponseToClientDtoAscending(
    ratesResponse: RatesResponse,
  ): ExchangeRatesDto {
    return RateMappingService.mapRatesResponseToClientDto(ratesResponse).sort(
      (a, b) => a.value - b.value,
    );
  }

  static mapRatesResponseToClientDtoDescending(
    ratesResponse: RatesResponse,
  ): ExchangeRatesDto {
    return RateMappingService.mapRatesResponseToClientDto(ratesResponse).sort(
      (a, b) => b.value - a.value,
    );
  }

  static mapRatesResponseToClientDto(
    ratesResponse: RatesResponse,
  ): ExchangeRatesDto {
    const currencyRates: CurrencyRates = ratesResponse.rates;
    const exchangeRatesDto: ExchangeRatesDto = [];

    for (const value of Object.values(currencyRates)) {
      exchangeRatesDto.push(value);
    }

    return exchangeRatesDto;
  }
}
