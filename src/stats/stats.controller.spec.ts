import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('StatsController', () => {
  let statsController: StatsController;
  const mockedStatsService = {
    getHistoricalStats: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StatsController],
      providers: [{ provide: StatsService, useValue: mockedStatsService }],
    }).compile();

    statsController = app.get<StatsController>(StatsController);
  });

  it('should be defined', () => {
    expect(StatsController).toBeDefined();
  });

  describe('root', () => {
    it('should return expected ascending exchange rates', async () => {
      const mockRatesResponse = {
        rates: {
          btc: {
            name: 'Bitcoin',
            unit: 'BTC',
            value: 1,
            type: 'crypto',
          },
          eth: {
            name: 'Ether',
            unit: 'ETH',
            value: 3,
            type: 'crypto',
          },
        },
      };
      jest
        .spyOn(mockedStatsService, 'getHistoricalStats')
        .mockReturnValueOnce(mockRatesResponse);

      const result = await statsController.getCoinStats('fake_coin');

      expect(mockedStatsService.getHistoricalStats).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockRatesResponse);
    });
  });
});
