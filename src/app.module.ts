import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RatesController } from './rates/rates.controller';
import { RatesModule } from './rates/rates.module';
import { RatesService } from './rates/rates.service';

@Module({
  imports: [RatesModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
