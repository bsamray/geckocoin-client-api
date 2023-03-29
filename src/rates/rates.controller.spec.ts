import { Test, TestingModule } from '@nestjs/testing';
import { RatesController } from './rates.controller';
import { RatesService } from './rates.service';

describe('RatesController', () => {
  let ratesController: RatesController;
  const mockedRatesService = {
    getAscendingRates: jest.fn()
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RatesController],
      providers: [
        { provide: RatesService, useValue: mockedRatesService }
      ],
    }).compile();

    ratesController = app.get<RatesController>(RatesController);
  });

  it('should be defined', () => {
    expect(ratesController).toBeDefined();
  });

  describe('root', () => {
    it('should return expected ascending exchange rates', async () => {
      const mockRatesResponse = {
        "rates": {
          "btc": {
              "name": "Bitcoin",
              "unit": "BTC",
              "value": 1,
              "type": "crypto"
          },
          "eth": {
              "name": "Ether",
              "unit": "ETH",
              "value": 3,
              "type": "crypto"
          }
        }
      };
      mockedRatesService.getAscendingRates.mockResolvedValue(mockRatesResponse);

      const response = await ratesController.getAscendingRates();

      expect(mockedRatesService.getAscendingRates).toHaveBeenCalledTimes(1);
      expect(response).toEqual(mockRatesResponse);
    });
  });
});
