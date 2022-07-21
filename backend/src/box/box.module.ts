import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoxService } from './box.service';
import { Box, BoxSchema, Card, CardSchema } from './box.schema';
import { BoxController } from './box.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Box.name, schema: BoxSchema },
      { name: Card.name, schema: CardSchema },
    ]),
  ],
  providers: [BoxService],
  controllers: [BoxController],
})
export class BoxModule {}
