import { Module } from '@nestjs/common';
import { StreamFileFindallService } from './stream-file-findall.service';
import { StreamFileFindallController } from './stream-file-findall.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event, EventDraft } from 'src/events/entities/event.entity';
import { CheckPoint } from 'src/checkpoints/entities/checkpoint.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Event, EventDraft ,CheckPoint])],
  controllers: [StreamFileFindallController],
  providers: [StreamFileFindallService]
})
export class StreamFileFindallModule {}
