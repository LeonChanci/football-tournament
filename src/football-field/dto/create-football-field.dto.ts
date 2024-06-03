import { IsString, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateFootballFieldDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly type: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    readonly address?: string;
}