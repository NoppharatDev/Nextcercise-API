import { Test, TestingModule } from '@nestjs/testing';
import { JoinEventListsService } from './join-event-lists.service';

describe('JoinEventListsService', () => {
  let service: JoinEventListsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JoinEventListsService],
    }).compile();

    service = module.get<JoinEventListsService>(JoinEventListsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
