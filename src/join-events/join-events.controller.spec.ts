import { Test, TestingModule } from '@nestjs/testing';
import { JoinEventsController } from './join-events.controller';
import { JoinEventsService } from './join-events.service';

describe('JoinEventsController', () => {
  let controller: JoinEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JoinEventsController],
      providers: [JoinEventsService],
    }).compile();

    controller = module.get<JoinEventsController>(JoinEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
