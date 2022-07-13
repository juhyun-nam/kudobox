import { Module } from '@nestjs/common';
import { BoxService } from './box.service';

@Module({
  providers: [BoxService]
})
export class BoxModule {}
