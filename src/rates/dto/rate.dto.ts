type CurrencyRate = {
  name: string;
  unit: string;
  value: number;
  type: string;
};

type CurrencyRates = {
  [key: string]: CurrencyRate;
};

export type RatesResponse = {
  rates: CurrencyRates;
};