import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { CoinStatsDto } from './dto/stats.dto';
import { StatsService } from './stats.service';

@Controller('coin_stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @ApiOperation({ summary: 'Get Coin stats for last 30 days' })
  @Get(':id')
  getCoinStats(@Param('id') coinId: string): Promise<CoinStatsDto> {
    return this.statsService.getHistoricalStats(coinId);
  }
}
