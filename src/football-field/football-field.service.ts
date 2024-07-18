import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateFootballFieldDto } from './dto/create-football-field.dto';
import { UpdateFootballFieldDTO } from './dto/update-football-field.dto';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { FootballField } from './entities/football-field.entity';

@Injectable()
export class FootballFieldService {

    constructor(
        @InjectModel(FootballField.name)
        private readonly footballFieldModel: Model<FootballField>,
    ) {}

    async create(footballFieldDTO: CreateFootballFieldDto): Promise<FootballField> {
        try {
            const newFootballField = await this.footballFieldModel.create(footballFieldDTO);
            return newFootballField;
        } catch ( error ) {
            this.handleException(error);
        }
    }

    async findAll(): Promise<FootballField[]> {
        return await this.footballFieldModel.find();
    }

    async findOne(id: string): Promise<FootballField> {
        let footballField: FootballField = await this.footballFieldModel.findById(id);
        if (isValidObjectId(id)) {
            return footballField;
        } else {
            throw new NotFoundException(`Football Field with id '${id}' not found`);
        }
    }

    async update(id: string, updateFootballFieldDTO: UpdateFootballFieldDTO): Promise<FootballField> {
        try {
            const footballField: FootballField = await this.findOne(id);  
            if (footballField) {
                await footballField.updateOne(updateFootballFieldDTO);
                return {...footballField.toJSON(), ...updateFootballFieldDTO};
            }
        } catch ( error ) {
            this.handleException(error);
        }
    }

    async delete(id: string) {
        const footballField = await this.findOne(id);
        await footballField.deleteOne();
        return {
            status: HttpStatus.OK,
            message: 'Delete Sucessfully'
        };
    }

    public handleException(error: any) {
        if ( error.code === 11000 ) {
            throw new BadRequestException(`The Football Field is already exist ${ JSON.stringify( error.keyValue ) }`);
        }
        throw new InternalServerErrorException(`Could not be performed with Football Field - Check Server Logs`);
    }
}
