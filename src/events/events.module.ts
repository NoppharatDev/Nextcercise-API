import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event, EventDraft } from './entities/event.entity';
import { CheckPoint } from 'src/checkpoints/entities/checkpoint.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Event, EventDraft, CheckPoint])],
  controllers: [EventsController],
  providers: [EventsService]
})
export class EventsModule {}
