import { IsNotEmpty, IsString } from "class-validator";

export class CreateTypeFootballFieldDto {
    
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;
}
