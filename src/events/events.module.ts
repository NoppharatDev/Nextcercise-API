import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event, EventDraft } from './entities/event.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Event, EventDraft])],
  controllers: [EventsController],
  providers: [EventsService]
})
export class EventsModule {}
