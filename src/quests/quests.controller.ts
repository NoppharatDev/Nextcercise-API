import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { QuestsService } from './quests.service';
import { QuestDto } from './dto/quest.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Quests')
@Controller('quest')
export class QuestsController {
  constructor(private readonly questsService: QuestsService) {}

  @Post()
  create(@Res() res, @Body() questDto: QuestDto) {
    return this.questsService.create(res, questDto);
  }

  @Get()
  findAll(@Res() res) {
    return this.questsService.findAll(res);
  }

  @Get(':qId')
  findOne(@Param('qId') qId: string, @Res() res) {
    return this.questsService.findOne(+qId, res);
  }

  @Get('show/trash')
  findTrash(@Res() res) {
    return this.questsService.findTrash(res);
  }

  @Patch(':qId')
  update(@Param('qId') qId: string, @Body() questDto: QuestDto, @Res() res) {
    return this.questsService.update(+qId, questDto, res);
  }

  @Patch('to-trash/:id')
  removeToTrashQuest(@Param('id') id: string, @Res() res) {
    return this.questsService.removeToTrashQuest(+id, res);
  }

  @Patch('restore/:id')
  restoreQuest(@Param('id') id: string, @Res() res) {
    return this.questsService.restoreQuest(+id, res);
  }

  @Delete('delete/:id')
  deleteQuest(@Param('id') id: string, @Res() res) {
    return this.questsService.deleteQuest(+id, res);
  }
}
