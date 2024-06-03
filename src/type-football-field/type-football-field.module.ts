import { Module } from '@nestjs/common';
import { TypeFootballFieldService } from './type-football-field.service';
import { TypeFootballFieldController } from './type-football-field.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeFootballFieldShema } from './entities/type-football-field.entity';
import { TYPE_FOOTBALL_FIELD } from 'src/common/models/models';

@Module({
  controllers: [TypeFootballFieldController],
  providers: [TypeFootballFieldService],
  imports: [
    MongooseModule.forFeature([
      {
        name: TYPE_FOOTBALL_FIELD.name,
        schema: TypeFootballFieldShema
      }
    ])
  ]
})
export class TypeFootballFieldModule {}
