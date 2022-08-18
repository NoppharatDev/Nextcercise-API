import { Test, TestingModule } from '@nestjs/testing';
import { StreamFilesService } from './stream-files.service';

describe('StreamFilesService', () => {
  let service: StreamFilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StreamFilesService],
    }).compile();

    service = module.get<StreamFilesService>(StreamFilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
