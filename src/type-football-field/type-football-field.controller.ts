import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypeFootballFieldService } from './type-football-field.service';
import { CreateTypeFootballFieldDto } from './dto/create-type-football-field.dto';
import { UpdateTypeFootballFieldDto } from './dto/update-type-football-field.dto';

@Controller('type-football-field')
export class TypeFootballFieldController {
  
  constructor(
    private readonly typeFootballFieldService: TypeFootballFieldService
  ) {}

  @Post()
  create(@Body() createTypeFootballFieldDto: CreateTypeFootballFieldDto) {
    return this.typeFootballFieldService.create(createTypeFootballFieldDto);
  }

  @Get()
  findAll() {
    return this.typeFootballFieldService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeFootballFieldService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateTypeFootballFieldDto: UpdateTypeFootballFieldDto) {
    return this.typeFootballFieldService.update(+id, updateTypeFootballFieldDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeFootballFieldService.remove(+id);
  }
}
