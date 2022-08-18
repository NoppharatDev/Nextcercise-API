import { Module } from '@nestjs/common';
import { PathsService } from './paths.service';
import { PathsController } from './paths.controller';
import { Path } from './entities/path.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckPoint } from 'src/checkpoints/entities/checkpoint.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Path, CheckPoint])],
  controllers: [PathsController],
  providers: [PathsService]
})
export class PathsModule {}
