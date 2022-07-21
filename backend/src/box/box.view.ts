import { ApiProperty } from '@nestjs/swagger';

export class CardView {
  constructor(recipient: string, message: string) {
    this.recipient = recipient;
    this.message = message;
  }

  @ApiProperty()
  readonly recipient: string;

  @ApiProperty()
  readonly message: string;
}

export class BoxView {
  constructor(
    name: string,
    createdAt: Date,
    isSealed: boolean,
    description?: string,
    cards?: CardView[],
  ) {
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
    this.isSealed = isSealed;
    this.cards = cards;
  }

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly description?: string;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly isSealed: boolean;

  @ApiProperty({ type: [CardView] })
  readonly cards?: CardView[];
}
