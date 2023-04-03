import { CoinDayStats, CoinStatsDto } from '../dto/stats.dto';

export class StatsUtil {
  static calculateHistoricalStats(
    hostoricalStats: CoinDayStats[],
  ): CoinStatsDto {
    const coinStatsDto: CoinStatsDto = {
      id: hostoricalStats[0]?.id,
      symbol: hostoricalStats[0]?.symbol,
      name: hostoricalStats[0]?.name,
      market_price: {
        gbp: {
          low: Number.MAX_VALUE,
          high: Number.MIN_VALUE,
          average: 0,
        },
      },
      market_cap: {
        gbp: {
          low: Number.MAX_VALUE,
          high: Number.MIN_VALUE,
          average: 0,
        },
      },
    };

    let marketPriceSum = 0;
    let marketCapSum = 0;

    for (let i = 0; i < hostoricalStats.length; i++) {
      const curStat: CoinDayStats = hostoricalStats[i];

      if (
        curStat?.market_data?.current_price.gbp <
        coinStatsDto.market_price.gbp.low
      ) {
        coinStatsDto.market_price.gbp.low =
          curStat.market_data.current_price.gbp;
      }
      if (
        curStat.market_data.current_price.gbp >
        coinStatsDto.market_price.gbp.high
      ) {
        coinStatsDto.market_price.gbp.high =
          curStat.market_data.current_price.gbp;
      }
      marketPriceSum += curStat.market_data.current_price.gbp;

      if (
        curStat?.market_data?.market_cap?.gbp < coinStatsDto.market_cap.gbp.low
      ) {
        coinStatsDto.market_cap.gbp.low = curStat.market_data.market_cap.gbp;
      }
      if (
        curStat.market_data.market_cap.gbp > coinStatsDto.market_cap.gbp.high
      ) {
        coinStatsDto.market_cap.gbp.high = curStat.market_data.market_cap.gbp;
      }
      marketCapSum += curStat.market_data.market_cap.gbp;
    }

    coinStatsDto.market_price.gbp.average =
      marketPriceSum / hostoricalStats.length;
    coinStatsDto.market_cap.gbp.average = marketCapSum / hostoricalStats.length;

    return coinStatsDto;
  }
}
