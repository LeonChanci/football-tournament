import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FootballFieldService } from './football-field.service';
import { CreateFootballFieldDTO } from './dto/create-football-field.dto';
import { UpdateFootballFieldDTO } from './dto/update-football-field.dto';

@Controller('api/v1/football-field')
export class FootballFieldController {

  constructor(
    private readonly footballFieldService: FootballFieldService
  ) {}

  @Post('/create')
  createFootballFiel(@Body() createFootballFieldDTO: CreateFootballFieldDTO) {
    return this.footballFieldService.create(createFootballFieldDTO);
  }

  @Get('/getAll')
  getAllFootballFields() {
    return this.footballFieldService.findAll();
  }

  @Get('/getOneById/:id')
  getFootballFieldById(@Param('id') id: string) {
    return this.footballFieldService.findOneById(id);
  }

  @Patch('/updateById/:id')
  updateFootballFiel(
    @Param('id') id: string,
    @Body() updateFootballFieldDTO: UpdateFootballFieldDTO) {
    return this.footballFieldService.updateOneById(id, updateFootballFieldDTO);
  }

  @Delete('/deleteById/:id')
  deleteFootballFiel(@Param('id') id: string) {
    return this.footballFieldService.deleteOneById(id);
  }
}
