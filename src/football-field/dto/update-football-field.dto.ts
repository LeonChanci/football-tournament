import { IsString, IsOptional } from 'class-validator';

export class UpdateFootballFieldDTO {
    
    @IsOptional()
    @IsString()
    readonly name?: string;

    @IsOptional()
    @IsString()
    readonly type?: string;

    @IsOptional()
    @IsString()
    readonly address?: string;
}