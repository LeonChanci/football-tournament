import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFootballFieldDTO {

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly type: string;

    @IsOptional()
    @IsString()
    readonly address?: string;
}