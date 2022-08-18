import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { JoinEventListsService } from './join-event-lists.service';
import { JoinEventListDto } from './dto/join-event-list.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Joint Event Lists')
@Controller('join-event-list')
export class JoinEventListsController {
  constructor(private readonly joinEventListsService: JoinEventListsService) {}

  @Post('generate/:eId')
  generate(@Param('eId') eId: string, @Body() joinEventListDto: JoinEventListDto, @Res() res) {
    return this.joinEventListsService.generate(eId, joinEventListDto, res);
  }

  @Patch(':jelId')
  update(@Param('jelId') jelId: string, @Body() joinEventListDto: JoinEventListDto, @Res() res) {
    return this.joinEventListsService.update(+jelId, joinEventListDto, res);
  }

  @Get('event/:jeId')
  findAllByEventId(@Param('jeId') jeId: string, @Res() res) {
    return this.joinEventListsService.findAllByEventId(+jeId, res);
  }

  @Get(':jelId')
  findOneByJoinEventList(@Param('jelId') jelId: string, @Res() res) {
    return this.joinEventListsService.findOneByJoinEventList(+jelId, res);
  }
}
