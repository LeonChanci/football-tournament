import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FootballFieldModule } from './football-field/football-field.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TypeFootballFieldModule } from './type-football-field/type-football-field.module';
import { TypeFootballFieldModule } from './type-football-field/type-football-field.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.URI_MONGODB_ATLAS), 
    FootballFieldModule, TypeFootballFieldModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
