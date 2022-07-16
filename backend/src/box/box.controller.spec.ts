import { Test, TestingModule } from '@nestjs/testing';
import { BoxController } from './box.controller';
import { BoxService } from './box.service';

describe('BoxController', () => {
  let controller: BoxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoxController],
      providers: [
        {
          provide: BoxService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BoxController>(BoxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
