import { Module } from '@nestjs/common';
import { FootballFieldController } from './football-field.controller';
import { FootballFieldService } from './football-field.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FootballFieldShema } from './entities/football-field.entity';
import { FOOTBALL_FIELD } from 'src/common/models/models';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: FOOTBALL_FIELD.name,
      schema: FootballFieldShema
      },
    ]),
  ],
  controllers: [FootballFieldController],
  providers: [FootballFieldService]
})
export class FootballFieldModule {}
