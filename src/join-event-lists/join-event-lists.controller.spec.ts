import { Test, TestingModule } from '@nestjs/testing';
import { JoinEventListsController } from './join-event-lists.controller';
import { JoinEventListsService } from './join-event-lists.service';

describe('JoinEventListsController', () => {
  let controller: JoinEventListsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JoinEventListsController],
      providers: [JoinEventListsService],
    }).compile();

    controller = module.get<JoinEventListsController>(JoinEventListsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
