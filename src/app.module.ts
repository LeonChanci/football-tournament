import { join } from 'path';
import { Module } from '@nestjs/common';
import { FootballFieldModule } from './football-field/football-field.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TypeFootballFieldModule } from './type-football-field/type-football-field.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CommonModule } from './common/common.module';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
      isGlobal: true,
      expandVariables: true,
    }),

    MongooseModule.forRoot(
      process.env.URI_MONGODB_ATLAS
      //process.env.URI_MONGODB_DOCKER
    ), 

    FootballFieldModule, TypeFootballFieldModule, CommonModule
  ],
})
export class AppModule {}
