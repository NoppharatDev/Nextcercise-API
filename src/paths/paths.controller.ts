import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { PathsService } from './paths.service';
import { GeneratePathDto, PathDto } from './dto/path.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Paths')
@Controller('path')
export class PathsController {
  constructor(private readonly pathsService: PathsService) {}
  
  @Post('generate')
  generatePath(@Body() generatePathDto: GeneratePathDto, @Res() res) {
    return this.pathsService.generatePath(generatePathDto, res);
  }

  @Get(':eId')
  findAllByEvent(@Param('eId') eId: string, @Res() res) {
    return this.pathsService.findAllByEvent(eId, res);
  }
}
