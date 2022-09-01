import { Test, TestingModule } from '@nestjs/testing';
import { StreamFileFindallService } from './stream-file-findall.service';

describe('StreamFileFindallService', () => {
  let service: StreamFileFindallService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StreamFileFindallService],
    }).compile();

    service = module.get<StreamFileFindallService>(StreamFileFindallService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
