import { StatsUtil } from './stats.util';
import { CoinStatsDto } from '../dto/stats.dto';
import { coinDay1Stats, coinDay2Stats } from './sample';

describe('StatsUtil', () => {
  it('historical stats to presentable format', () => {
    const expectedOutcome: CoinStatsDto = {
      id: 'aichain',
      symbol: 'ait',
      name: 'AICHAIN',
      market_price: {
        gbp: {
          low: 0.02,
          high: 0.04,
          average: 0.03,
        },
      },
      market_cap: {
        gbp: {
          low: 500.234,
          high: 1000.568,
          average: 750.401,
        },
      },
    };

    const result = StatsUtil.calculateHistoricalStats([
      coinDay1Stats,
      coinDay2Stats,
    ]);

    expect(result).toStrictEqual(expectedOutcome);
  });
});
