import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoxDto {
  @ApiProperty()
  readonly isSealed: boolean;
}
