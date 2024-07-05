import { Model } from 'mongoose';
import { FootballField } from './entities/football-field.entity';
import { FootballFieldController } from './football-field.controller';
import { FootballFieldService } from './football-field.service';
import { HttpStatus, NotFoundException } from '@nestjs/common';
import { CreateFootballFieldDto } from './dto/create-football-field.dto';
import { UpdateFootballFieldDTO } from './dto/update-football-field.dto';

describe('FootballFieldController', () => {
    let footballFieldController: FootballFieldController;
    let footballFieldService: FootballFieldService;
    let footballFieldModel:  Model<FootballField>;

    beforeEach(() => {
        footballFieldService = new FootballFieldService(footballFieldModel);
        footballFieldController = new FootballFieldController(footballFieldService);
    })

    describe('createFootballFiel', () => {
        it('Debe crear una Cancha de Futbol', async() => {
            let result: CreateFootballFieldDto = {
                'name': 'Cancha 1',
                'type': 'Fútbol 11',
                'address': 'CR 50'
            };

            const createSpy = jest.spyOn(footballFieldService, 'create').mockImplementation((): any => result);
            
            expect(await footballFieldController.createFootballFiel(result)).toBe(result);
            expect(createSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe('getAllFootballFields', () => {
        it('Debe devolver una lista de Canchas de Futbol', async() => {
            let result = [{
                'name': 'Cancha 1',
                'type': 'Fútbol 11',
                'address': 'CR 50'
            }];
            const findAllSpy = jest.spyOn(footballFieldService, 'findAll').mockImplementation((): any => result);
            
            expect(await footballFieldController.getAllFootballFields()).toBe(result);
            expect(findAllSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe('getFootballFieldById', () => {
        it('Debe devolver una Cancha de Futbol', async() => {
            let result = {
                'name': 'Cancha 1',
                'type': 'Fútbol 11',
                'address': 'CR 50'
            };
            const findOneSpy = jest.spyOn(footballFieldService, 'findOne').mockImplementation((): any => result);

            expect(await footballFieldController.getFootballFieldById('1')).toBe(result);
            expect(findOneSpy).toHaveBeenCalledTimes(1);
            expect(findOneSpy).toHaveBeenCalledWith('1');
        });

        it('Debe devolver una Excepcion, no existe Cancha de Futbol', async() => {
            const findOneSpy = jest.spyOn(footballFieldService, 'findOne').mockImplementation((): any => undefined);

            try {
                expect(await footballFieldController.getFootballFieldById('1')).toBe(undefined);   
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
            }

            expect(findOneSpy).toHaveBeenCalledTimes(1);
            expect(findOneSpy).toHaveBeenCalledWith('1');
        });
    });

    describe('updateFootballFiel', () => {
        it('Debe actualizar una Cancha de Futbol', async() => {
            let update: UpdateFootballFieldDTO = {
                'name': 'Cancha 2',
                'type': 'Fútbol 5',
                'address': 'CR 25'
            };
            let result = {
                'name': 'Cancha 1',
                'type': 'Fútbol 11',
                'address': 'CR 50'
            };

            jest.spyOn(footballFieldService, 'findOne').mockImplementation((): any => result);
            const updateSpy = jest.spyOn(footballFieldService, 'update').mockImplementation((): any => update);
            
            expect(await footballFieldController.updateFootballFiel('1', update)).toBe(update);
            expect(updateSpy).toHaveBeenCalledTimes(1);
            expect(updateSpy).toHaveBeenCalledWith('1', update);
        });
    });

    describe('deleteFootballFiel', () => {
        it('Debe eliminar una Cancha de Futbol', async() => {
            let result = {
                'name': 'Cancha 1',
                'type': 'Fútbol 11',
                'address': 'CR 50'
            };
            let delet = {
                'status': HttpStatus.OK,
                'message': 'Delete Sucessfully',
            }
            jest.spyOn(footballFieldService, 'findOne').mockImplementation((): any => result);
            const deleteSpy = jest.spyOn(footballFieldService, 'delete').mockImplementation((): any => delet);

            expect(await footballFieldController.deleteFootballFiel('1')).toBe(delet);
            expect(deleteSpy).toHaveBeenCalledTimes(1);
            expect(deleteSpy).toHaveBeenCalledWith('1');
        });

        it('No debe eliminar una Cancha de Futbol', async() => {
            jest.spyOn(footballFieldService, 'findOne').mockImplementation((): any => undefined);
            const deleteSpy = jest.spyOn(footballFieldService, 'delete').mockImplementation((): any => undefined);

            try {
                expect(await footballFieldController.deleteFootballFiel('1')).toBe(undefined);   
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
            }
            expect(deleteSpy).toHaveBeenCalledTimes(1);
            expect(deleteSpy).toHaveBeenCalledWith('1');
        });
    });
});