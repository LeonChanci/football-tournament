import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFootballFieldDTO } from './dto/create-football-field.dto';
import { UpdateFootballFieldDTO } from './dto/update-football-field.dto';
import { IFootballField } from 'src/football-field/interfaces/football-field.interface';
import { InjectModel } from '@nestjs/mongoose';
import { FOOTBALLFIELD } from 'src/common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class FootballFieldService {

    constructor(
        @InjectModel(FOOTBALLFIELD.name) private readonly model: Model<IFootballField>,
    ) {}

    async create(footballFieldDTO: CreateFootballFieldDTO): Promise<IFootballField> {
        const newFotballField = new this.model(footballFieldDTO);
        return await newFotballField.save();
    }

    async findAll(): Promise<IFootballField[]> {
        return await this.model.find();
    }

    async findOneById(id: string): Promise<IFootballField> {
        const footballField = await this.model.findById(id);
        if (!footballField) throw new NotFoundException(`Football Field with id '${id}' not found`);
        return footballField;
    }

    async updateOneById(id: string, updateFootballFieldDTO: UpdateFootballFieldDTO): Promise<IFootballField> {
        let footballFielUpdated = null;
        if (this.findOneById(id)) {
            return footballFielUpdated = await this.model.findByIdAndUpdate(id, updateFootballFieldDTO);
        }
        return footballFielUpdated;
    }

    async deleteOneById(id: string) {
        if (this.findOneById(id)) {
            this.model.findByIdAndDelete(id);
        }
        return {
            status: HttpStatus.OK,
            message: 'Delete Sucessfully',
        };
    }
}
