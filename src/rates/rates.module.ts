import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { RatesController } from './rates.controller';
import { RatesService } from './rates.service';

@Module({
  imports: [HttpModule],
  controllers: [RatesController],
  providers: [RatesService],
})
export class RatesModule {}
