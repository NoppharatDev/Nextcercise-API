import { Module } from '@nestjs/common';
import { JoinEventListsService } from './join-event-lists.service';
import { JoinEventListsController } from './join-event-lists.controller';
import { JoinEventList } from './entities/join-event-list.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Path } from 'src/paths/entities/path.entity';

@Module({
  imports:[TypeOrmModule.forFeature([JoinEventList, Path])],
  controllers: [JoinEventListsController],
  providers: [JoinEventListsService]
})
export class JoinEventListsModule {}
