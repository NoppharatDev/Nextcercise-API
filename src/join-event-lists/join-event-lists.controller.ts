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

  @Get()
  findAll() {
    return this.joinEventListsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.joinEventListsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() joinEventListDto: JoinEventListDto) {
    return this.joinEventListsService.update(+id, joinEventListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.joinEventListsService.remove(+id);
  }
}
