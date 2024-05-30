import { Injectable } from '@nestjs/common';
import { CreateTypeFootballFieldDto } from './dto/create-type-football-field.dto';
import { UpdateTypeFootballFieldDto } from './dto/update-type-football-field.dto';

@Injectable()
export class TypeFootballFieldService {
  create(createTypeFootballFieldDto: CreateTypeFootballFieldDto) {
    return 'This action adds a new typeFootballField';
  }

  findAll() {
    return `This action returns all typeFootballField`;
  }

  findOne(id: number) {
    return `This action returns a #${id} typeFootballField`;
  }

  update(id: number, updateTypeFootballFieldDto: UpdateTypeFootballFieldDto) {
    return `This action updates a #${id} typeFootballField`;
  }

  remove(id: number) {
    return `This action removes a #${id} typeFootballField`;
  }
}
