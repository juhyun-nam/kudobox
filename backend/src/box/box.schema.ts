import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Box {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  secretKey: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: true })
  isSealed: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }] })
  cards: Card[];
}

export type BoxDocument = Box & Document;

export const BoxSchema = SchemaFactory.createForClass(Box);

@Schema()
export class Card {
  @Prop({ required: true })
  recipient: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  message: string;
}

export type CardDocument = Card & Document;

export const CardSchema = SchemaFactory.createForClass(Card);
