import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateTypeFootballFieldDto {
    
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    readonly description: string;
}
