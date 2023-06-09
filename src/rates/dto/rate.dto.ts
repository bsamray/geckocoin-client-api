type CurrencyRate = {
  name: string;
  unit: string;
  value: number;
  type: string;
};

export type CurrencyRates = {
  [key: string]: CurrencyRate;
};

export type RatesResponse = {
  rates: CurrencyRates;
};

export type ExchangeRatesDto = Array<CurrencyRate>;
