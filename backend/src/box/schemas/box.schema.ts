import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 } from 'uuid';

@Schema()
export class Card {
  @Prop({ default: v4 })
  uuid: string;

  @Prop({required: true})
  to: string;

  @Prop({default: Date.now})
  createdAt: Date;

  @Prop()
  content: string;
}

@Schema()
export class Box {
  @Prop({ default: v4 })
  uuid: string;

  @Prop({required: true})
  name: string;

  @Prop()
  description: string;

  @Prop()
  secretKey: string;

  @Prop({default: Date.now})
  createdAt: Date;

  @Prop({default: true})
  isSealed: Boolean;

  @Prop()
  cards: Card[];
}

export type BoxDocument = Box & Document;

export const BoxSchema = SchemaFactory.createForClass(Box);
