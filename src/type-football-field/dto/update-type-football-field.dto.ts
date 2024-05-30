import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeFootballFieldDto } from './create-type-football-field.dto';

export class UpdateTypeFootballFieldDto extends PartialType(CreateTypeFootballFieldDto) {
    
}
