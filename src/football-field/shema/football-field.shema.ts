import mongoose from 'mongoose';

export const FootballFieldShema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    address: { type: String, required: false },
}, 
{ timestamps: true });

FootballFieldShema.index({ name: 1 }, { unique: true });
