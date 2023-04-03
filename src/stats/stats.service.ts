import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { StatsUtil } from './util/stats.util';
import { CoinStatsDto, CoinDayStats } from './dto/stats.dto';
import * as moment from 'moment';

@Injectable()
export class StatsService {
  constructor(private readonly httpService: HttpService) {}

  async getHistoricalStats(coinId: string): Promise<CoinStatsDto> {
    const historicalStatsPromises: Promise<CoinDayStats>[] = Array.from(
      { length: parseInt(process.env.HISTORY_DAYS) || 30 },
      (_, i) => i + 1,
    ).map(async (num) => {
      const statDate: string = moment()
        .subtract(num, 'days')
        .format('DD-MM-yyyy');
      const dayStats = await this.getDayStats(coinId, statDate);

      return dayStats;
    });
    const historicalStats: CoinDayStats[] = await Promise.all(
      historicalStatsPromises,
    );

    return Promise.resolve(StatsUtil.calculateHistoricalStats(historicalStats));
  }

  private async getDayStats(
    coinId: string,
    statDate: string,
  ): Promise<CoinDayStats> {
    // TODO Read from config
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}/history?date=${statDate}`;
    const { data } = await firstValueFrom(this.httpService.get(url));

    return data as CoinDayStats;
  }
}
