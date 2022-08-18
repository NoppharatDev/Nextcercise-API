import { Module } from '@nestjs/common';
import { JoinEventsService } from './join-events.service';
import { JoinEventsController } from './join-events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JoinEvent } from './entities/join-event.entity';

@Module({
  imports:[TypeOrmModule.forFeature([JoinEvent])],
  controllers: [JoinEventsController],
  providers: [JoinEventsService]
})
export class JoinEventsModule {}
