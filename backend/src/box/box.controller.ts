import { ApiCreatedResponse, ApiDefaultResponse } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BoxService } from './box.service';
import { BoxView, CardView } from './box.view';
import { CreateBoxDto } from './dto/create-box.dto';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateBoxDto } from './dto/update-box.dto';

@Controller('boxes')
export class BoxController {
  constructor(private boxServie: BoxService) {}

  @Post()
  @ApiCreatedResponse({ type: BoxView })
  async create(@Body() createBoxDto: CreateBoxDto): Promise<BoxView> {
    return await this.boxServie.create(createBoxDto);
  }

  @Get()
  @ApiDefaultResponse({ type: [BoxView] })
  async findAll(): Promise<BoxView[]> {
    return this.boxServie.findAll();
  }

  @Get(':name')
  @ApiDefaultResponse({ type: BoxView })
  async findOne(@Param('name') name: string): Promise<BoxView> {
    return this.boxServie.findOne(name);
  }

  @Patch(':name')
  @ApiDefaultResponse({ type: BoxView })
  async update(
    @Param('name') name: string,
    @Body() updateBoxDto: UpdateBoxDto,
  ): Promise<BoxView> {
    return await this.boxServie.update(name, updateBoxDto);
  }

  @Post(':name/cards')
  @ApiCreatedResponse({ type: CardView })
  async createCard(
    @Param('name') name: string,
    @Body() createCardDto: CreateCardDto,
  ): Promise<CardView> {
    return await this.boxServie.addCard(createCardDto, name);
  }
}
