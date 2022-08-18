import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors, Res } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { CheckpointsService } from './checkpoints.service';
import { CheckpointDto } from './dto/checkpoint.dto';

@ApiTags('Checkpoints')
@Controller('checkpoint')
export class CheckpointsController {
  constructor(private readonly checkpointsService: CheckpointsService) { }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'backgroundFile' }, { name: 'startFile' }, { name: 'resultFile' }]),
  )
  create(
    @UploadedFiles()
    files: {
      backgroundFile?: Express.Multer.File[];
      startFile?: Express.Multer.File[];
      resultFile?: Express.Multer.File[];
    },
    @Body() checkPointDto: CheckpointDto,
    @Res() res,
  ) {
    return this.checkpointsService.create(files, checkPointDto, res);
  }

  @Patch(':eId/:cpId')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'startFile' }, { name: 'resultFile' }]),
  )
  update(
    @Param('eId') eId: string,
    @Param('cpId') cpId: string,
    @UploadedFiles()
    files: {
      startFile?: Express.Multer.File[];
      resultFile?: Express.Multer.File[];
    },
    @Body() checkPointDto: CheckpointDto,
    @Res() res,
  ) {
    return this.checkpointsService.update(files, eId, cpId, checkPointDto, res);
  }

  @Get()
  findAll(@Res() res) {
    return this.checkpointsService.findAll(res);
  }

  @Get('event/:eId')
  findAllByEvent(@Param('eId') eId: string, @Res() res) {
    return this.checkpointsService.findAllByEvent(eId, res);
  }

  @Delete('delete/:eId/:cpId')
  deleteCheckpoint(@Param('eId') eId: string, @Param('cpId') cpId: string, @Res() res) {
    return this.checkpointsService.deleteCheckpoint(eId, cpId, res);
  }
}
