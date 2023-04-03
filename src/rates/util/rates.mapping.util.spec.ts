import { RatesMappingUtil } from './rates.mapping.util';
import { RatesResponse, ExchangeRatesDto } from '../dto/rate.dto';

describe('RatesMappingUtil', () => {
  const ratesResponse: RatesResponse = {
    rates: {
      btc: {
        name: 'Bitcoin',
        unit: 'BTC',
        value: 15.743,
        type: 'crypto',
      },
      eth: {
        name: 'Ether',
        unit: 'ETH',
        value: 15.742,
        type: 'crypto',
      },
      ltc: {
        name: 'Litecoin',
        unit: 'LTC',
        value: 317.819,
        type: 'crypto',
      },
      bch: {
        name: 'Bitcoin Cash',
        unit: 'BCH',
        value: 233.553,
        type: 'crypto',
      },
    },
  };

  describe('mapRatesResponseToClientDtoAscending', () => {
    it('should return an array of CurrencyRates sorted in ascending order', () => {
      const result: ExchangeRatesDto =
        RatesMappingUtil.mapRatesResponseToClientDtoAscending(ratesResponse);

      expect(result.length).toBe(4);
      expect(result[0]).toStrictEqual({
        name: 'Ether',
        unit: 'ETH',
        value: 15.742,
        type: 'crypto',
      });
      expect(result[1]).toStrictEqual({
        name: 'Bitcoin',
        unit: 'BTC',
        value: 15.743,
        type: 'crypto',
      });
      expect(result[2]).toStrictEqual({
        name: 'Bitcoin Cash',
        unit: 'BCH',
        value: 233.553,
        type: 'crypto',
      });
      expect(result[3]).toStrictEqual({
        name: 'Litecoin',
        unit: 'LTC',
        value: 317.819,
        type: 'crypto',
      });
    });
  });

  describe('mapRatesResponseToClientDtoDescending', () => {
    it('should return an array of CurrencyRates sorted in descending order', () => {
      const result: ExchangeRatesDto =
        RatesMappingUtil.mapRatesResponseToClientDtoDescending(ratesResponse);

      expect(result.length).toBe(4);
      expect(result[0]).toStrictEqual({
        name: 'Litecoin',
        unit: 'LTC',
        value: 317.819,
        type: 'crypto',
      });
      expect(result[1]).toStrictEqual({
        name: 'Bitcoin Cash',
        unit: 'BCH',
        value: 233.553,
        type: 'crypto',
      });
      expect(result[2]).toStrictEqual({
        name: 'Bitcoin',
        unit: 'BTC',
        value: 15.743,
        type: 'crypto',
      });
      expect(result[3]).toStrictEqual({
        name: 'Ether',
        unit: 'ETH',
        value: 15.742,
        type: 'crypto',
      });
    });
  });
});
