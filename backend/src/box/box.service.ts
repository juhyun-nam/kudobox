import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Box, BoxDocument } from './schemas/box.schema';
import { CreateBoxDto } from './dto/create-box.dto';

@Injectable()
export class BoxService {
  constructor(@InjectModel('Box') private readonly boxModel: Model<BoxDocument>) { }

  async create(createBoxDto: CreateBoxDto): Promise<Box> {
    const createdCat = await this.boxModel.create(createBoxDto);
    return createdCat;
  }

  async findAll(): Promise<Box[]> {
    return this.boxModel.find().exec();
  }
  async findOne(uuid: string): Promise<Box> {
    return this.boxModel.findOne({ uuid: uuid }).exec();
  }

  async delete(uuid: string) {
    const deletedBox = await this.boxModel
      .findByIdAndRemove({ uuid: uuid })
      .exec();
    return deletedBox;
  }
}
