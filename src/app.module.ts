import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FootballFieldModule } from './football-field/football-field.module';

@Module({
  imports: [FootballFieldModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
