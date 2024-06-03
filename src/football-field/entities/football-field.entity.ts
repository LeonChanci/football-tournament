import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class FootballField extends Document {

    @Prop({
        unique: true,
        required: true
    })
    name: string;
    
    @Prop({
        unique: true,
        required: true
    })
    type: string;

    @Prop({
        unique: false,
        required: false
    })
    address: string;
}

export const FootballFieldShema = SchemaFactory.createForClass( FootballField );