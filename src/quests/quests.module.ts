import { Module } from '@nestjs/common';
import { QuestsService } from './quests.service';
import { QuestsController } from './quests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quest } from './entities/quest.entity';
import { CheckPoint } from 'src/checkpoints/entities/checkpoint.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Quest, CheckPoint])],
  controllers: [QuestsController],
  providers: [QuestsService]
})
export class QuestsModule {}
