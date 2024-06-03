import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TypeFootballField extends Document {

    @Prop({
        unique: true,
        required: true,
    })
    name: string;
    
    @Prop({
        unique: false,
        required: true,
    })
    description: string;
}

export const TypeFootballFieldShema = SchemaFactory.createForClass( TypeFootballField );
