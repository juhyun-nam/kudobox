import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Box, BoxDocument, Card, CardDocument } from './schemas/box.schema';
import { CreateBoxDto } from './dto/create-box.dto';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateBoxDto } from './dto/update-box.dto';

@Injectable()
export class BoxService {
  constructor(
    @InjectModel(Box.name) private readonly boxModel: Model<BoxDocument>,
    @InjectModel(Card.name) private readonly cardModel: Model<CardDocument>,
  ) {}

  async create(createBoxDto: CreateBoxDto): Promise<Box> {
    return await this.boxModel.create(createBoxDto);
  }

  async findAll(): Promise<Box[]> {
    return this.boxModel.find().exec();
  }

  async findOne(name: string): Promise<Box> {
    const isSealed = await this.boxModel
      .findOne({ name: name }, 'isSealed')
      .exec();
    if (isSealed) {
      return this.boxModel.findOne({ name: name }).exec();
    }
    return this.boxModel.findOne({ name: name }).populate('cards').exec();
  }

  async update(name: string, updateBoxDto: UpdateBoxDto): Promise<Box> {
    return await this.boxModel.findOneAndUpdate(
      { name: name },
      { isSealed: updateBoxDto.isSealed },
      { new: true },
    );
  }

  async delete(name: string) {
    const deletedBox = await this.boxModel
      .findByIdAndRemove({ name: name })
      .exec();
    return deletedBox;
  }

  async addCard(createCardDto: CreateCardDto, boxName: string): Promise<Card> {
    const box = await this.boxModel.findOne({ name: boxName }).exec();
    const createdCard = await this.cardModel.create({
      ...createCardDto,
      box: box._id,
    });
    return createdCard;
  }
}
