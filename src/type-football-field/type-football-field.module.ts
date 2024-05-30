import { Module } from '@nestjs/common';
import { TypeFootballFieldService } from './type-football-field.service';
import { TypeFootballFieldController } from './type-football-field.controller';

@Module({
  controllers: [TypeFootballFieldController],
  providers: [TypeFootballFieldService],
})
export class TypeFootballFieldModule {}
