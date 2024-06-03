import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FootballFieldService } from './football-field.service';
import { CreateFootballFieldDto } from './dto/create-football-field.dto';
import { UpdateFootballFieldDTO } from './dto/update-football-field.dto';

@Controller('football-field')
export class FootballFieldController {

  constructor(
    private readonly footballFieldService: FootballFieldService
  ) {}

  @Post('/create')
  createFootballFiel(@Body() createFootballFieldDTO: CreateFootballFieldDto) {
    return this.footballFieldService.create(createFootballFieldDTO);
  }

  @Get('/getAll')
  getAllFootballFields() {
    return this.footballFieldService.findAll();
  }

  @Get('/getOneById/:id')
  getFootballFieldById(@Param('id') id: string) {
    return this.footballFieldService.findOne(id);
  }

  @Patch('/updateById/:id')
  updateFootballFiel(
    @Param('id') id: string,
    @Body() updateFootballFieldDTO: UpdateFootballFieldDTO) {
    return this.footballFieldService.update(id, updateFootballFieldDTO);
  }

  @Delete('/deleteById/:id')
  deleteFootballFiel(@Param('id') id: string) {
    return this.footballFieldService.delete(id);
  }
}
