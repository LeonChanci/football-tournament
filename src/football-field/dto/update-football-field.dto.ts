import { PartialType } from '@nestjs/mapped-types';
import { CreateFootballFieldDto } from './create-football-field.dto';

export class UpdateFootballFieldDTO  extends PartialType(CreateFootballFieldDto) {

}