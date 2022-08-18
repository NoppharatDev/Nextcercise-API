import { Module } from '@nestjs/common';
import { StreamFilesService } from './stream-files.service';
import { StreamFilesController } from './stream-files.controller';

@Module({
  controllers: [StreamFilesController],
  providers: [StreamFilesService]
})
export class StreamFilesModule {}
