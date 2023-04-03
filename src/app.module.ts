import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AxiosExceptionFilter } from './filters/custom.exception.filter';
import { Module } from '@nestjs/common';
import { RatesModule } from './rates/rates.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [RatesModule, StatsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AxiosExceptionFilter,
    },
  ],
})
export class AppModule {}
