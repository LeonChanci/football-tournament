import mongoose, { Model, isValidObjectId } from 'mongoose';
import { FootballField } from './entities/football-field.entity';
import { FootballFieldService } from "./football-field.service"
import { Test, TestingModule } from "@nestjs/testing";
import { ConfigModule } from "@nestjs/config";
import { getModelToken } from "@nestjs/mongoose";
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';

describe('FootballFieldService', () => {
    let footballFieldService: FootballFieldService;
 
    const mockModel = {
        create: jest.fn(),
        find: jest.fn(),
        updateOne: jest.fn(),
        findById: jest.fn(),
        isValidObjectId: jest.fn(),
        deleteOne: jest.fn(),
      };

    beforeEach(async() => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule],
            providers: [
                FootballFieldService,
                {
                    provide: getModelToken(FootballField.name),
                    useValue: mockModel,
                },
            ],
        }).compile();
        footballFieldService = module.get<FootballFieldService>(FootballFieldService);
    });

    it('should be defined', () => {
        expect(footballFieldService).toBeDefined();
      });
      
    describe('createFootballFiel', () => {
        let footballField = {
            'name': 'Cancha 1',
            'type': 'Fútbol 11',
            'address': 'CR 50'
        };
        it('Debe crear una Cancha de Futbol', async () => {
            mockModel.create.mockResolvedValue(footballField);
            const result = await footballFieldService.create(footballField);
            expect(result).toEqual(footballField);
        });

        let footballFieldNull = {
            'name': null,
            'type': null,
        };
        it('Debe devolver una Excepcion InternalServerErrorException', async () => {
            mockModel.create.mockResolvedValue(new InternalServerErrorException);
            try {
                await footballFieldService.create(footballFieldNull);
            } catch (error) {
                expect(error).toBeInstanceOf(InternalServerErrorException);
                expect(footballFieldService.handleException(1)).toBe(InternalServerErrorException);
                expect(footballFieldService.handleException).toHaveBeenCalledTimes(1);
            }
        });
    });

    describe('getAllFootballField', () => {
        let footballFields = [{
            '_id': '1',
            'name': 'Cancha 1',
            'type': 'Fútbol 11',
            'address': 'CR 50'
        },{
            '_id': '2',
            'name': 'Cancha 2',
            'type': 'Fútbol 7',
            'address': 'CR 25'
        }];
        mockModel.find.mockResolvedValue(footballFields);
        it('Debe devolver una lista de Canchas de Futbol', async () => {
            const result = await footballFieldService.findAll();
            expect(result).toEqual(footballFields);
        });
    });

    describe('findOneFootballField', () => {
        let footballField = {
            'name': 'Cancha 1',
            'type': 'Fútbol 11',
            'address': 'CR 50'
        };

        it('Debe devolver una Cancha de Futbol', async () => {
            mockModel.findById.mockResolvedValue(footballField);
            new mongoose.Types.ObjectId('62a23958e5a9e9b88f853a67');
            const result = await footballFieldService.findOne('62a23958e5a9e9b88f853a67');
            expect(result).toEqual(footballField);
        });
        
        it('Debe devolver una Excepcion NotFoundException', async () => {
            mockModel.findById.mockResolvedValue(footballField);
            try {
                await footballFieldService.findOne('1'); 
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
            }
        });
    });
    
    describe('getFootballFieldById', () => {
        let footballField = {
            '_id': '2',
            'name': 'Cancha 1',
            'type': 'Fútbol 11',
            'address': 'CR 50'
        };
        mockModel.findById.mockResolvedValue(footballField);
        mockModel.isValidObjectId.mockResolvedValue(false);
        it('Debe devolver una Exceptiom NotFoundException, no existe Cancha de Futbol', async () => {
            try {
                expect(await footballFieldService.findOne('1')).toBe(undefined);   
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
            }
        });
    });

    describe('deleteFootballField', () => {
        let result = {
            'deletedCount': 1,
            'acknowledged': true
        };

        let resultNot = {
            'deletedCount': 0,
            'acknowledged': false
        };
        
        it('Debe elminar una Cancha de Futbol', async () => {
            mockModel.deleteOne.mockResolvedValue(result);
            const response = await footballFieldService.delete("1");
            expect(response.message).toEqual("Delete Sucessfully");
        });

        it('Debe devolver una Exceptiom NotFoundException, no eliminó Cancha de Futbol', async () => {
            mockModel.deleteOne.mockResolvedValue(resultNot);
            try {
                await footballFieldService.delete("1"); 
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestException);
            }
        });
    });

    describe('handleException', () => {
        let error: any = {
            'code' : 11000,
            'keyValue' : 'error'
        }
        it('Debe devolver una Excepcion BadRequestException', async () => {
            try {
                expect(footballFieldService.handleException(error));
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestException);
            }
        });
        let errorNull: any = {
            'code' : 1,
        }
        it('Debe devolver una Excepcion InternalServerErrorException', async () => {
            try {
                expect(footballFieldService.handleException(errorNull));
            } catch (error) {
                expect(error).toBeInstanceOf(InternalServerErrorException);
            }
        });
    });

});