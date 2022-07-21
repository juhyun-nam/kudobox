import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Box, BoxDocument, Card, CardDocument } from './box.schema';
import { CreateBoxDto } from './dto/create-box.dto';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateBoxDto } from './dto/update-box.dto';
import { BoxView, CardView } from './box.view';

@Injectable()
export class BoxService {
  constructor(
    @InjectModel(Box.name) private readonly boxModel: Model<BoxDocument>,
    @InjectModel(Card.name) private readonly cardModel: Model<CardDocument>,
  ) {}

  async create(createBoxDto: CreateBoxDto): Promise<BoxView> {
    const { name, description, createdAt, isSealed } =
      await this.boxModel.create(createBoxDto);
    return new BoxView(name, createdAt, isSealed, description);
  }

  async findAll(): Promise<BoxView[]> {
    const boxes = await this.boxModel
      .find()
      .select('-_id name description createdAt isSealed')
      .exec();
    return boxes.map((b) => new BoxView(b.name, b.createdAt, b.isSealed, b.description))
  }

  async findOne(name: string): Promise<BoxView> {
    const { isSealed } = await this.boxModel
      .findOne({ name: name }, 'isSealed')
      .exec();
    if (isSealed) {
      return this.boxModel
        .findOne({ name: name })
        .select('-_id name description createdAt isSealed')
        .exec();
    }
    const { description, createdAt, cards } = await this.boxModel
      .findOne({ name: name })
      .populate('cards')
      .exec();

    return {
      name,
      description,
      createdAt,
      isSealed,
      cards: cards.map((v) => ({ recipient: v.recipient, message: v.message })),
    };
  }

  async update(name: string, updateBoxDto: UpdateBoxDto): Promise<BoxView> {
    return await this.boxModel.findOneAndUpdate(
      { name: name },
      { isSealed: updateBoxDto.isSealed },
      { new: true },
    );
  }

  async delete(name: string) {
    await this.boxModel.findByIdAndRemove({ name: name }).exec();
  }

  async addCard(
    createCardDto: CreateCardDto,
    boxName: string,
  ): Promise<CardView> {
    let box = await this.boxModel.findOne({ name: boxName }).exec();
    const card = await this.cardModel.create(createCardDto);
    box.cards.push(card);
    box.save();
    return { recipient: card.recipient, message: card.message };
  }
}
