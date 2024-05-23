import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FootballFieldService {

    private footballFields = [
        {
            id: 1,
            name: 'Cancha1',
            type: 'Futbol 5'
        },
        {
            id: 2,
            name: 'Cancha2',
            type: 'Futbol 7'
        },
        {
            id: 3,
            name: 'Cancha3',
            type: 'Futbol 11'
        },
    ];

    public findAll(): object[] {
        return this.footballFields;
    }

    public findOneById(id: number): object {
        const footballField: object = this.footballFields.find(item => item.id === id);

        if(!footballField) throw new NotFoundException(`Foorball Field with id '${id}' not found`);

        return footballField;
    }
}
