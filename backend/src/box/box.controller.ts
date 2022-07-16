import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Box } from './schemas/box.schema';
import { BoxService } from './box.service';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';

@Controller('boxes')
export class BoxController {
  constructor(private boxServie: BoxService) {}

  @Post()
  async create(@Body() createBoxDto: CreateBoxDto): Promise<Box> {
    console.log(createBoxDto.name);
    return await this.boxServie.create(createBoxDto);
  }

  @Get()
  async findAll(): Promise<Box[]> {
    return this.boxServie.findAll();
  }

  @Get(':name')
  async findOne(@Param('name') name: string): Promise<Box> {
    return this.boxServie.findOne(name);
  }

  @Patch(':name')
  async update(
    @Param('name') name: string,
    @Body() updateBoxDto: UpdateBoxDto,
  ): Promise<Box> {
    return await this.boxServie.update(name, updateBoxDto);
  }
}
