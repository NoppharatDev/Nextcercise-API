import { Module } from '@nestjs/common';
import { CheckpointsService } from './checkpoints.service';
import { CheckpointsController } from './checkpoints.controller';
import { CheckPoint } from './entities/checkpoint.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([CheckPoint])],
  controllers: [CheckpointsController],
  providers: [CheckpointsService]
})
export class CheckpointsModule {}
