import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty()
  recipient: string;
  @ApiProperty()
  message: string;
}
