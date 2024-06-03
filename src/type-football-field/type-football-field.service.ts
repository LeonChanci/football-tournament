import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTypeFootballFieldDto } from './dto/create-type-football-field.dto';
import { UpdateTypeFootballFieldDto } from './dto/update-type-football-field.dto';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TYPE_FOOTBALL_FIELD } from 'src/common/models/models';
import { TypeFootballField } from './entities/type-football-field.entity';

@Injectable()
export class TypeFootballFieldService {

    constructor(
        @InjectModel(TYPE_FOOTBALL_FIELD.name)
        private readonly typeFootballFieldModel: Model<TypeFootballField>,
    ) {}

    async create(createTypeFootballFieldDto: CreateTypeFootballFieldDto): Promise<TypeFootballField> {
        try {
            const newTypeFootballField: TypeFootballField = await this.typeFootballFieldModel.create(createTypeFootballFieldDto);
            return newTypeFootballField;
        } catch ( error ) {
            this.handleException(error);
        } 
    }

    async findAll(): Promise<TypeFootballField[]> {
        return await this.typeFootballFieldModel.find();
    }

    async findOne(id: string): Promise<TypeFootballField> {
        let typeFootballField: TypeFootballField = await this.typeFootballFieldModel.findById(id);
        if (isValidObjectId(id)) {
            return typeFootballField;
        } else {
            throw new NotFoundException(`Type Football Field with id '${id}' not found`);
        }
    }

    async update(id: string, updateTypeFootballFieldDto: UpdateTypeFootballFieldDto): Promise<TypeFootballField> {
        try {
            const typeFootballField: TypeFootballField = await this.findOne(id);  
            if (typeFootballField) {
                await typeFootballField.updateOne(updateTypeFootballFieldDto, {new: true});
                return {...typeFootballField.toJSON(), ...updateTypeFootballFieldDto};
            }
        } catch ( error ) {
            this.handleException(error);
        }
    }

    async remove(id: string) {
        const typeFootballField  = await this.findOne(id);
        await typeFootballField.deleteOne();
        return {
          status: HttpStatus.OK,
          message: 'Delete Sucessfully',
        };
    }

    private handleException(error: any) {
        if ( error.code === 11000 ) {
            throw new BadRequestException(`The Type Football Field is already exist ${ JSON.stringify( error.keyValue ) }`);
        }
        console.log(error);
        throw new InternalServerErrorException(`Could not be performed with Type Football Field - Check Server Logs`);
    }
}
