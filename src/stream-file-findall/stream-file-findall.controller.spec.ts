import { Test, TestingModule } from '@nestjs/testing';
import { StreamFileFindallController } from './stream-file-findall.controller';
import { StreamFileFindallService } from './stream-file-findall.service';

describe('StreamFileFindallController', () => {
  let controller: StreamFileFindallController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StreamFileFindallController],
      providers: [StreamFileFindallService],
    }).compile();

    controller = module.get<StreamFileFindallController>(StreamFileFindallController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
