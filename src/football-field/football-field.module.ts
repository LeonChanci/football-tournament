import { Module } from '@nestjs/common';
import { FootballFieldController } from './football-field.controller';
import { FootballFieldService } from './football-field.service';

@Module({
  controllers: [FootballFieldController],
  providers: [FootballFieldService]
})
export class FootballFieldModule {}
