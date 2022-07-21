import { ApiProperty } from '@nestjs/swagger';

export class CreateBoxDto {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly description: string;
  @ApiProperty()
  readonly secretKey: string;
}
