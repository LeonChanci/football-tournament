import { Module } from '@nestjs/common';
import { FootballFieldController } from './football-field.controller';
import { FootballFieldService } from './football-field.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FOOTBALLFIELD } from '../common/models/models';
import { FootballFieldShema } from './shema/football-field.shema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
      name: FOOTBALLFIELD.name,
      useFactory:() => FootballFieldShema,
      },
    ]),
  ],
  controllers: [FootballFieldController],
  providers: [FootballFieldService]
})
export class FootballFieldModule {}
