import { Test, TestingModule } from '@nestjs/testing';
import { StreamFilesController } from './stream-files.controller';
import { StreamFilesService } from './stream-files.service';

describe('StreamFilesController', () => {
  let controller: StreamFilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StreamFilesController],
      providers: [StreamFilesService],
    }).compile();

    controller = module.get<StreamFilesController>(StreamFilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
