import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventDto } from './dto/event.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@ApiTags('Events')
@Controller('event')
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'banner' }, { name: 'header' }, { name: 'visual' }]),
  )
  create(
    @UploadedFiles()
    files: {
      header?: Express.Multer.File[];
      banner?: Express.Multer.File[];
      visual?: Express.Multer.File[];
    },
    @Body() eventDto: EventDto,
    @Res() res,
  ) {
    return this.eventsService.create(files, eventDto, res);
  }

  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'banner' }, { name: 'header' }, { name: 'visual' }]),
  )
  update(
    @UploadedFiles()
    files: {
      banner?: Express.Multer.File[];
      visual?: Express.Multer.File[];
    },
    @Param('id') id: string,
    @Body() eventDto: EventDto,
    @Res() res,
  ) {
    return this.eventsService.update(files, id, eventDto, res);
  }

  @Patch('to-trash/:id')
  removeToTrashEvent(@Param('id') id: string, @Res() res) {
    return this.eventsService.removeToTrashEvent(id, res);
  }

  @Patch('restore/:id')
  restoreEvent(@Param('id') id: string, @Res() res) {
    return this.eventsService.restoreEvent(id, res);
  }

  @Get()
  findAll(@Res() res) {
    return this.eventsService.findAll(res);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res) {
    return this.eventsService.findOne(id, res);
  }

  @Get('show/trash')
  findTrash(@Res() res) {
    return this.eventsService.findTrash(res);
  }

  @Delete('delete/:id')
  deleteEvent(@Param('id') id: string, @Res() res) {
    return this.eventsService.deleteEvent(id, res);
  }
}
