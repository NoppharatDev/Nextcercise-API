import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { JoinEventsService } from './join-events.service';
import { JoinEventDto } from './dto/join-event.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Joint Events')
@Controller('join-event')
export class JoinEventsController {
  constructor(private readonly joinEventsService: JoinEventsService) {}

  @Post()
  joinEvent(@Body() joinEventDto: JoinEventDto, @Res() res) {
    return this.joinEventsService.joinEvent(joinEventDto, res);
  }
}
