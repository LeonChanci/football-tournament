import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { FootballFieldService } from './football-field.service';

@Controller('football-field')
export class FootballFieldController {

  constructor(
    private readonly footballFieldService: FootballFieldService
  ) {}

  @Get('/getAllFootballFields')
  getAllFootballFields(): object[] {
    return this.footballFieldService.findAll();
  }

  @Get('/getFootballField/:id')
  getFootballFieldById(@Param('id', ParseIntPipe) id: number) {
    return this.footballFieldService.findOneById(id);
  }

  @Post()
  createFootballFiel(@Body() body: any) {
    return body;
  }

  @Patch(':id')
  updateFootballFiel(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any) {
    return body;
  }

  @Delete(':id')
  deleteFootballFiel(
    @Param('id', ParseIntPipe) id: number) {
    return {
        id
    };
  }
}
