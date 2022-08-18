import { Test, TestingModule } from '@nestjs/testing';
import { JoinEventsService } from './join-events.service';

describe('JoinEventsService', () => {
  let service: JoinEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JoinEventsService],
    }).compile();

    service = module.get<JoinEventsService>(JoinEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
